import { getAllArticles } from "@/lib/content";
import { getPosts } from "@/lib/news";

export function GET() {
  const articles = getAllArticles().map((a) => ({
    title: a.title,
    summary: a.summary,
    href: a.href,
    category: a.category,
  }));
  const posts = getPosts().map((p) => ({
    title: p.title,
    summary: p.summary,
    href: p.href,
    category: "news",
  }));
  return Response.json([...posts, ...articles]);
}
