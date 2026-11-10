import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { AdSlot } from "@/components/AdSlot";
import { FeedLead, FeedRow, SectionHeading } from "@/components/FeedComponents";
import { getAllArticles } from "@/lib/content";
import { getFeedItems, getWikipedia } from "@/lib/feed";
import { categories } from "@/lib/site";

export default function Home() {
  const all = getFeedItems();
  const [lead, ...rest] = all;
  const secondary = rest.slice(0, 4);
  const latest = rest.slice(4, 14);
  const wiki = getWikipedia();
  const featured = getAllArticles()
    .filter((a) => a.featured)
    .slice(0, 3);

  return (
    <>
      {lead ? (
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pt-8 pb-12 lg:grid-cols-[1.6fr_1fr]">
          <FeedLead item={lead} />
          <aside aria-label="Ook vandaag">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">Ook vandaag</h2>
            <ul>
              {secondary.map((i) => (
                <FeedRow key={i.id} item={i} compact />
              ))}
            </ul>
            <Link href="/news" className="mt-6 inline-block rounded-full bg-peach px-5 py-2.5 text-sm font-bold text-bg hover:bg-pink">
              Al het nieuws
            </Link>
          </aside>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="font-display text-7xl leading-none tracking-wide text-pink sm:text-9xl">Welkom bij IOI.</h1>
          <p className="mt-4 text-xl text-cream/85">Het nieuws verschijnt hier zodra de feed is bijgewerkt. Dat gebeurt elk uur.</p>
        </section>
      )}

      <section className="border-y border-white/10 bg-surface/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Wat is IOI?</p>
            <p className="mt-1 max-w-2xl text-lg text-cream/90">
              Nederlandstalige uitleg over games en kunstmatige intelligentie, en het laatste nieuws daarover.
            </p>
          </div>
          <Link href="/ai" className="self-start text-sm font-bold uppercase tracking-[0.18em] text-cream hover:text-pink sm:self-auto">
            Start met AI →
          </Link>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="latest-heading">
          <div id="latest-heading">
            <SectionHeading href="/news" linkLabel="Meer">
              Laatste nieuws
            </SectionHeading>
          </div>
          {latest.length > 0 ? (
            <ul>
              {latest.map((i) => (
                <FeedRow key={i.id} item={i} />
              ))}
            </ul>
          ) : (
            <p className="text-muted">Geen extra koppen op dit moment.</p>
          )}
        </section>

        <aside className="space-y-12" aria-label="Wiki">
          <section>
            <h2 className="mb-4 font-display text-4xl tracking-wide text-white">Blader door de wiki</h2>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="group flex items-center justify-between py-3">
                    <span>
                      <span className="block font-bold text-white group-hover:text-pink">{c.label}</span>
                      <span className="block text-sm text-muted">{c.blurb}</span>
                    </span>
                    <span aria-hidden className="text-peach">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <AdSlot slot="sidebar" className="hidden lg:block" />
        </aside>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <SectionHeading href="/games" linkLabel="Wiki">
          Uitgelicht
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
          {wiki && (
            <article className="rounded-card border border-white/10 bg-surface p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Wikipedia</p>
              <h3 className="mt-2 font-display text-4xl tracking-wide text-white">{wiki.title}</h3>
              <p className="mt-3 line-clamp-6 text-cream/85">{wiki.extract}</p>
              <a
                href={wiki.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block text-sm font-bold text-pink underline underline-offset-4 hover:text-peach"
              >
                Lees verder op Wikipedia
              </a>
            </article>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((a) => (
              <ArticleCard key={a.href} article={a} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5">
        <AdSlot slot="home-mid" />
      </div>
    </>
  );
}
