import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

// Onze eigen Nederlandse nieuwsberichten: korte samenvattingen in eigen woorden,
// elk met een link naar het oorspronkelijke artikel. Geen volledige vertalingen.
const NEWS_DIR = path.join(process.cwd(), "content", "news");

export const newsTopics = {
  gta: "GTA VI",
  gaming: "Gaming",
} as const;
export type NewsTopic = keyof typeof newsTopics;

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  topic: z.enum(["gta", "gaming"]),
  source: z.object({
    name: z.string(),
    url: z.string().url(),
    originalTitle: z.string(),
  }),
});

export type Post = z.infer<typeof schema> & { slug: string; body: string; href: string };

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in content/news/${file}: ${parsed.error.message}`);
  }
  const slug = file.replace(/\.mdx$/, "");
  return { ...parsed.data, slug, body: content.trim(), href: `/news/${slug}` };
}

/** Newest first. */
export function getPosts(): Post[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(load)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "nl"));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
