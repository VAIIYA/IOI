import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-surface/50">
      <div className="mx-auto max-w-6xl space-y-4 px-5 py-10 text-sm text-muted">
        <p className="font-display text-2xl tracking-wider text-pink">
          {site.name} <span className="text-base tracking-normal text-muted">· {site.fullName}</span>
        </p>
        <p className="max-w-3xl">{site.disclaimer}</p>
        <nav className="flex flex-wrap gap-5 text-cream/80">
          <Link href="/about" className="hover:text-peach">Over</Link>
          <Link href="/faq" className="hover:text-peach">Veelgestelde vragen</Link>
          <Link href="/privacy" className="hover:text-peach">Privacy</Link>
          {site.repoUrl && (
            <a href={site.repoUrl} className="hover:text-peach" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </nav>
        <p>Tekst op deze site is beschikbaar onder CC BY-SA 4.0. Code is MIT-gelicentieerd.</p>
      </div>
    </footer>
  );
}
