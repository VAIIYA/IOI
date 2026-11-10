#!/usr/bin/env node
// Redactiehulp: toont Engelstalige kandidaat-berichten uit content/feed/items.json
// (bronnen met lang "en") die nog geen Nederlands bericht in content/news/ hebben,
// en leest met --read de openingsalinea's van het oorspronkelijke artikel.
//
// Gebruik:
//   node scripts/news-candidates.mjs            # lijst, nieuwste eerst (max 15)
//   node scripts/news-candidates.mjs --read 3   # lees de eerste 3 kandidaten
//
// Let op: Google News-links verwijzen naar een doorverwijspagina. Het oplossen naar de
// echte uitgeverslink gebruikt een ongedocumenteerd Google-endpoint en kan beperkt of
// geblokkeerd worden. Lees het artikel zelf voordat je een bericht schrijft, en
// schrijf het bericht in eigen woorden met een link naar de bron.

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const readIdx = args.indexOf("--read");
const readCount = readIdx >= 0 ? Number(args[readIdx + 1] ?? 3) : 0;

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

async function coveredTitles() {
  const dir = path.join(ROOT, "content", "news");
  const files = (await readdir(dir).catch(() => [])).filter((f) => f.endsWith(".mdx"));
  const titles = new Set();
  for (const f of files) {
    const raw = await readFile(path.join(dir, f), "utf8");
    const m = raw.match(/^\s*originalTitle:\s*(.+)$/m);
    if (m) titles.add(norm(m[1].replace(/^["']|["']$/g, "")));
  }
  return titles;
}

async function resolve(link) {
  const id = link.split("/articles/")[1]?.split("?")[0];
  if (!id) return link;
  const page = await (
    await fetch(`https://news.google.com/articles/${id}?hl=en-US&gl=US&ceid=US:en`, { headers: { "user-agent": "Mozilla/5.0" } })
  ).text();
  const sg = page.match(/data-n-a-sg="([^"]+)"/)?.[1];
  const ts = page.match(/data-n-a-ts="([^"]+)"/)?.[1];
  if (!sg || !ts) return undefined;
  const inner = JSON.stringify([
    "garturlreq",
    [["X", "X", ["X", "X"], null, null, 1, 1, "US:en", null, 1, null, null, null, null, null, 0, 1], "X", "X", 1, [1, 1, 1], 1, 1, null, 0, 0, null, 0],
    id,
    Number(ts),
    sg,
  ]);
  const res = await fetch("https://news.google.com/_/DotsSplashUi/data/batchexecute", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded;charset=UTF-8", "user-agent": "Mozilla/5.0" },
    body: "f.req=" + encodeURIComponent(JSON.stringify([[["Fbv4je", inner, null, "generic"]]])),
  });
  return (await res.text()).match(/garturlres\\",\\"(https?:[^"\\]+)/)?.[1];
}

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " ", "#x27": "'", rsquo: "’", lsquo: "‘", ndash: "–", mdash: "—" };
const text = (h) =>
  h.replace(/<[^>]+>/g, " ").replace(/&([a-z#0-9x]+);/gi, (m, n) => ENT[n] ?? m).replace(/\s+/g, " ").trim();

async function lead(url) {
  const r = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; IOIFeedBot/1.0)" },
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
  });
  const html = (await r.text()).replace(/<(script|style)[\s\S]*?<\/\1>/g, "");
  return [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).filter((p) => p.length > 60).slice(0, 7);
}

const items = JSON.parse(await readFile(path.join(ROOT, "content", "feed", "items.json"), "utf8"));
const done = await coveredTitles();
const candidates = items
  .filter((i) => i.lang === "en" && !done.has(norm(i.title)))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, readCount || 15);

if (candidates.length === 0) console.log("Geen nieuwe kandidaten.");

for (const [n, c] of candidates.entries()) {
  console.log(`\n${n + 1}. [${c.source}] ${c.title}\n   ${c.publishedAt.slice(0, 10)}  ${c.url}`);
  if (readCount) {
    try {
      const real = await resolve(c.url);
      console.log(`   Bron: ${real ?? "(niet op te lossen)"}`);
      if (real) for (const p of await lead(real)) console.log(`   | ${p.slice(0, 400)}`);
    } catch (e) {
      console.log(`   Fout: ${e.message}`);
    }
  }
}
