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

## Nieuws

Nieuws komt uit de feed (`scripts/update-feed.mjs`) en wordt niet met de hand geschreven. Elk nieuwsitem linkt naar het oorspronkelijke artikel; we kopiëren geen teksten.
