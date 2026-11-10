import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Over" };

export default function About() {
  return (
    <div className="prose-wiki mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-6 font-display text-6xl tracking-wide text-pink">Over {site.name}</h1>
      <p>
        {site.name} ({site.fullName}) is een Nederlandstalige website over games en kunstmatige intelligentie.
        We leggen onderwerpen uit in begrijpelijke taal, van game-engines tot taalmodellen, en we verzamelen het
        laatste nieuws met een link naar de bron.
      </p>
      <p>
        Nieuws is nooit onze eigen bewering: elke kop linkt naar het oorspronkelijke artikel. Achtergrondartikelen
        zijn onze eigen samenvattingen en vermelden hun bronnen.
      </p>
      <p>{site.disclaimer}</p>
      {site.repoUrl && (
        <p>
          De code is open source. Zie je een fout of wil je een artikel toevoegen? Open een pull request op{" "}
          <a href={site.repoUrl}>GitHub</a>.
        </p>
      )}
    </div>
  );
}
