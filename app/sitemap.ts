import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { getPosts } from "@/lib/news";
import { categories, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/news", "/about", "/faq", "/privacy"].map((p) => ({ url: `${site.url}${p}` }));
  const posts = getPosts().map((p) => ({ url: `${site.url}${p.href}`, lastModified: p.date }));
  const cats = categories.map((c) => ({ url: `${site.url}/${c.slug}` }));
  const articles = getAllArticles().map((a) => ({
    url: `${site.url}${a.href}`,
    lastModified: a.updated,
  }));
  return [...pages, ...cats, ...articles, ...posts];
}
