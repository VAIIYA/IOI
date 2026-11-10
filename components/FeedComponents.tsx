import Link from "next/link";
import { formatDate, kindMeta, type FeedItem } from "@/lib/feed";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Small uppercase label: "Nieuws", "Community"... */
export function KindLabel({ kind }: { kind: FeedItem["kind"] }) {
  const meta = kindMeta[kind];
  return <span className={`text-xs font-bold uppercase tracking-[0.18em] ${meta.tone}`}>{meta.label}</span>;
}

function Meta({ item }: { item: FeedItem }) {
  return (
    <p className="mt-2 text-xs text-muted">
      <span className="font-semibold text-cream/80">{item.source}</span> · {formatDate(item.publishedAt)}
    </p>
  );
}

/** Big lead story: label, large headline, dek, source. */
export function FeedLead({ item }: { item: FeedItem }) {
  return (
    <article className="group">
      <a href={item.url} {...external} className="block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-white/10 bg-surface">
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <>
              <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: "var(--sunset)" }} />
              <p aria-hidden className="absolute bottom-2 right-4 font-display text-[7rem] leading-none tracking-wide text-bg/30 sm:text-[10rem]">
                IOI
              </p>
            </>
          )}
        </div>
        <div className="mt-5">
          <KindLabel kind={item.kind} />
          <h2 className="mt-2 font-display text-5xl leading-[0.95] tracking-wide text-white transition group-hover:text-pink sm:text-7xl">
            {item.title}
          </h2>
          {item.summary && <p className="mt-4 max-w-3xl text-lg leading-snug text-cream/85 sm:text-xl">{item.summary}</p>}
          <Meta item={item} />
        </div>
      </a>
    </article>
  );
}

/** One row in a river of stories. */
export function FeedRow({ item, compact = false }: { item: FeedItem; compact?: boolean }) {
  return (
    <li className="border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <a href={item.url} {...external} className="group block">
        <KindLabel kind={item.kind} />
        <h3
          className={`mt-1.5 font-bold leading-snug text-white transition group-hover:text-pink ${
            compact ? "text-base" : "text-xl sm:text-2xl"
          }`}
        >
          {item.title}
        </h3>
        {!compact && item.summary && <p className="mt-2 text-sm leading-relaxed text-cream/75">{item.summary}</p>}
        <Meta item={item} />
      </a>
    </li>
  );
}

export function SectionHeading({ children, href, linkLabel }: { children: React.ReactNode; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-pink pb-2">
      <h2 className="font-display text-4xl tracking-wide text-white sm:text-5xl">{children}</h2>
      {href && (
        <Link href={href} className="shrink-0 text-xs font-bold uppercase tracking-[0.18em] text-peach hover:text-pink">
          {linkLabel ?? "Alles"} →
        </Link>
      )}
    </div>
  );
}
