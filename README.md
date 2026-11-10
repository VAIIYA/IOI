# IOI — Games & AI

Nederlandstalige website over games en kunstmatige intelligentie, met een live nieuwsoverzicht. IOI staat voor Innovative Online Industries. De site is gebouwd met Next.js (App Router), Tailwind CSS v4 en MDX, op basis van dezelfde opzet als 6th Street.

> Onafhankelijke website. Niet gelieerd aan Rockstar Games, Take-Two Interactive of andere genoemde bedrijven.

## Ontwikkelen

```bash
npm install
npm run dev
```

## Live nieuws

`scripts/update-feed.mjs` haalt koppen uit openbare Google News-feeds (Nederlandse zoekopdrachten over games en AI) en de Nederlandse Wikipedia-intro over kunstmatige intelligentie. Het schrijft `content/feed/items.json` en `content/feed/wikipedia.json`. Alleen koppen, links en korte samenvattingen worden opgeslagen; elk item linkt naar de originele bron.

- Draai het lokaal met `npm run feed:update`.
- Om de feed elk uur automatisch bij te werken, voeg je een GitHub Action toe die dit script draait en wijzigingen commit.

## Artikelen toevoegen

Artikelen zijn MDX-bestanden in `content/games/` of `content/ai/`. Zie [CONTRIBUTING.md](CONTRIBUTING.md).

## Omgevingsvariabelen

| Naam | Doel |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonieke site-URL (sitemap, metadata). Zet dit bij deployen. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher-id (`ca-pub-…`). Leeg laten voor geen advertenties. |
| `NEXT_PUBLIC_REPO_URL` | Optioneel: link naar de GitHub-repository in de footer. |

## Licentie

Code: MIT. Tekst: CC BY-SA 4.0.
