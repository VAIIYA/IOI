export const site = {
  name: "IOI",
  fullName: "Innovative Online Industries",
  tagline: "Games & AI, in het Nederlands",
  // Zet NEXT_PUBLIC_SITE_URL in de deploy-omgeving; dit is alleen de lokale fallback.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  // Leeg = geen GitHub-links in de footer.
  repoUrl: process.env.NEXT_PUBLIC_REPO_URL ?? "",
  disclaimer:
    "IOI is een onafhankelijke website over games en AI. Niet gelieerd aan, goedgekeurd door of verbonden met Rockstar Games, Take-Two Interactive of andere bedrijven die in de artikelen worden genoemd. Alle handelsmerken zijn eigendom van hun rechthebbenden.",
} as const;

export const categories = [
  { slug: "games", label: "Games", blurb: "Game-engines, indiegames en wat er achter het spel zit." },
  { slug: "ai", label: "AI", blurb: "Van kunstmatige intelligentie tot taalmodellen, uitgelegd in begrijpelijk Nederlands." },
] as const;

// Bovenaan de site: het live nieuwsoverzicht (gevoed door content/feed).
export const sections = [{ href: "/news", label: "Nieuws" }] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function categoryLabel(slug: string) {
  if (slug === "news") return "Nieuws";
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}
