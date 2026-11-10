import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <div className="prose-wiki mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-6 font-display text-6xl tracking-wide text-pink">Privacy</h1>
      <p>We hebben geen accounts en verzamelen zelf geen persoonsgegevens.</p>
      <h2>Analytics</h2>
      <p>We gebruiken Vercel Web Analytics. Dat is cookievrij en volgt bezoekers niet over meerdere sites heen.</p>
      <h2>Advertenties</h2>
      <p>
        We tonen een beperkt aantal advertenties via Google AdSense. Google en zijn partners kunnen cookies gebruiken
        om advertenties te tonen en te meten. Waar dat wettelijk vereist is, vragen we eerst om toestemming en kun je
        je keuze altijd wijzigen. Meer informatie of afmelden kan op{" "}
        <a href="https://adssettings.google.com">adssettings.google.com</a>.
      </p>
      <h2>Contact</h2>
      <p>Vragen? Open een issue in onze GitHub-repository.</p>
    </div>
  );
}
