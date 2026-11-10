import type { Metadata } from "next";
import { FeedRow, SectionHeading } from "@/components/FeedComponents";
import { PostRow } from "@/components/PostCard";
import { getFeedItems } from "@/lib/feed";
import { getPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Nieuws",
  description: "Het laatste nieuws over games en AI, met een link naar elk oorspronkelijk artikel.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const items = getFeedItems();
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-peach">Live feed · elk uur bijgewerkt</p>
      <h1 className="mt-2 font-display text-6xl leading-none tracking-wide text-pink sm:text-8xl">Nieuws</h1>
      <p className="mt-4 max-w-2xl text-lg text-cream/85">
        Koppen uit openbare nieuwsbronnen over games en kunstmatige intelligentie. Elk item linkt naar het
        oorspronkelijke artikel. Wij kopiëren geen artikelen.
      </p>

      {posts.length > 0 && (
        <section className="mt-12" aria-labelledby="posts-heading">
          <div id="posts-heading">
            <SectionHeading>Onze berichten</SectionHeading>
          </div>
          <p className="mb-6 max-w-2xl text-sm text-muted">
            Korte Nederlandse samenvattingen van GTA VI- en gamingnieuws, elk met een link naar het oorspronkelijke
            artikel.
          </p>
          <ul className="max-w-3xl">
            {posts.map((p) => (
              <PostRow key={p.slug} post={p} />
            ))}
          </ul>
        </section>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="news-heading">
          <div id="news-heading">
            <SectionHeading>Koppen uit andere bronnen</SectionHeading>
          </div>
          {items.length > 0 ? (
            <ul>
              {items.map((i) => (
                <FeedRow key={i.id} item={i} />
              ))}
            </ul>
          ) : (
            <p className="text-muted">Nog geen koppen. De feed wordt elk uur bijgewerkt.</p>
          )}
        </section>

        <aside className="lg:sticky lg:top-40 lg:self-start">
          <p className="text-sm text-muted">
            Koppen zijn niet door de vermelde bedrijven bevestigd, tenzij de gelinkte bron dat zegt. Controleer de
            bron voordat je iets als feit neemt.
          </p>
        </aside>
      </div>
    </div>
  );
}
