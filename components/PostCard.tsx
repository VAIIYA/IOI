import Link from "next/link";
import { formatDate } from "@/lib/feed";
import { newsTopics, type Post } from "@/lib/news";

/** Eén Nederlands nieuwsbericht in een lijst: onderwerp, kop, korte inleiding, bron. */
export function PostRow({ post }: { post: Post }) {
  return (
    <li className="border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <Link href={post.href} className="group block">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-pink">{newsTopics[post.topic]}</span>
        <h3 className="mt-1.5 text-xl font-bold leading-snug text-white transition group-hover:text-pink sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/75">{post.summary}</p>
        <p className="mt-2 text-xs text-muted">
          Bron: <span className="font-semibold text-cream/80">{post.source.name}</span> · {formatDate(post.date)}
        </p>
      </Link>
    </li>
  );
}
