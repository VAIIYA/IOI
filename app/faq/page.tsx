import type { Metadata } from "next";

export const metadata: Metadata = { title: "Veelgestelde vragen" };

const faqs = [
  ["Is IOI een officiële site van een bedrijf?", "Nee. IOI is een onafhankelijke website. Hij is niet gelieerd aan de bedrijven die in artikelen worden genoemd."],
  ["Waar komt de informatie vandaan?", "Het nieuws komt van openbare nieuwsbronnen en elk item linkt naar het oorspronkelijke artikel. Achtergrondartikelen zijn eigen samenvattingen met bronvermelding."],
  ["Kan ik meedoen?", "Ja. Artikelen zijn gewone MDX-bestanden in de openbare GitHub-repository. Open een pull request."],
  ["Heb ik een account nodig?", "Nee. Er zijn geen accounts en geen registratie."],
];

export default function Faq() {
  return (
    <div className="prose-wiki mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-6 font-display text-6xl tracking-wide text-pink">Veelgestelde vragen</h1>
      {faqs.map(([q, a]) => (
        <div key={q}>
          <h2>{q}</h2>
          <p>{a}</p>
        </div>
      ))}
    </div>
  );
}
