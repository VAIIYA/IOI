import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AdSlot } from "@/components/AdSlot";
import { formatDate } from "@/lib/feed";
import { getPost, getPosts, newsTopics } from "@/lib/news";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: post.href },
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export default async function PostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    inLanguage: "nl",
    mainEntityOfPage: `${site.url}${post.href}`,
    isBasedOn: post.source.url,
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <p className="text-sm text-muted">
          <Link href="/news" className="text-peach hover:underline">Nieuws</Link> / {newsTopics[post.topic]}
        </p>
        <h1 className="mt-2 font-display text-5xl leading-none tracking-wide text-pink sm:text-7xl">{post.title}</h1>
        <p className="mt-4 text-xl leading-snug text-cream sm:text-2xl">{post.summary}</p>
        <p className="mt-2 text-xs text-muted">
          {formatDate(post.date)} · Bron:{" "}
          <a href={post.source.url} target="_blank" rel="noopener noreferrer" className="text-peach underline underline-offset-4">
            {post.source.name}
          </a>
        </p>
        <AdSlot slot="article-top" minHeight={120} />
        <div className="prose-wiki mt-6">
          <MDXRemote source={post.body} />
        </div>
        <section className="mt-12 rounded-card border border-white/10 bg-surface p-6">
          <h2 className="mb-3 font-display text-3xl tracking-wide text-white">Bron</h2>
          <p className="text-sm text-cream/85">
            Dit bericht is onze eigen Nederlandstalige samenvatting van een Engelstalig artikel. Het volledige
            verhaal staat bij de bron:
          </p>
          <p className="mt-3">
            <a
              href={post.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-pink underline underline-offset-4 hover:text-peach"
            >
              {post.source.originalTitle} ({post.source.name})
            </a>
          </p>
        </section>
      </article>
    </div>
  );
}
