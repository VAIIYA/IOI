# Bijdragen

1. Voeg een bestand toe aan `content/games/<slug>.mdx` of `content/ai/<slug>.mdx`.
2. Begin met frontmatter:

```yaml
---
title: Voorbeeld
summary: Eén zin die op kaarten en in zoekresultaten verschijnt.
updated: "2026-11-10"
featured: false
infobox:
  Sleutel: Waarde
related:
  - /ai/machine-learning
sources:
  - label: Wikipedia (nl) — Kunstmatige intelligentie
    url: https://nl.wikipedia.org/wiki/Kunstmatige_intelligentie
---
```

3. Gebruik `##` en `###` als koppen; de inhoudsopgave wordt automatisch gemaakt.
4. Schrijf in het Nederlands, in begrijpelijke taal. Vermeld voor elke bewering die je gebruikt een bron.
5. Draai `npm run lint && npm run build` voordat je een pull request opent. De build faalt bij ongeldige frontmatter.

## Nieuwsberichten

Nieuws staat op twee plekken:

- **Koppen** komen uit de feed (`scripts/update-feed.mjs`) en worden niet met de hand geschreven.
- **Onze berichten** zijn Nederlandse samenvattingen in `content/news/<slug>.mdx`, gebaseerd op een Engelstalig bronartikel (GTA VI- en gaming-topics van Google News).

Stappen voor een nieuw bericht:

1. Draai `npm run feed:update` en daarna `npm run news:candidates` voor een lijst kandidaten. Met `npm run news:candidates -- --read 3` worden de openingsalinea's van de bron getoond.
2. Lees het bronartikel en schrijf een korte samenvatting (enkele alinea's) **in eigen woorden**. Vertaal niet het volledige artikel en neem geen lange citaten over.
3. Gebruik deze frontmatter, met aanhalingstekens om titels en samenvattingen:

```yaml
---
title: "Nederlandse kop"
summary: "Eén zin."
date: "2026-11-10"
topic: gta   # of: gaming
source:
  name: GAMINGbible
  url: https://uitgever.example/artikel
  originalTitle: "Oorspronkelijke Engelse kop"
---
```

De bronlink staat altijd bovenaan het bericht en onderaan in een kader.
