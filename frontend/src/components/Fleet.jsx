import { Check } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/config";

const FleetCard = ({ data, image, testId, delay }) => (
  <Reveal delay={delay}>
    <article data-testid={testId} className="group relative h-[520px] lg:h-[600px] overflow-hidden border border-white/10">
      <img
        src={image}
        alt={data.label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover brightness-[1.2] transition-transform duration-[1.4s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-11">
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory">{data.label}</h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">{data.model}</p>
        <p className="mt-3 text-sm text-ivory/75 leading-relaxed max-w-md">{data.desc}</p>
        <ul className="mt-5 space-y-2">
          {data.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-ivory/85">
              <Check size={14} strokeWidth={2} className="text-gold shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  </Reveal>
);

export default function Fleet() {
  const { t } = useLanguage();
  return (
    <section id="flotta" data-testid="fleet-section" className="py-20 lg:py-28 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-semibold">{t.fleet.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight max-w-3xl">
            {t.fleet.title}
          </h2>
          <span className="mt-6 h-px w-16 bg-gold/60" />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FleetCard data={t.fleet.sedan} image={IMAGES.fleetSedan} testId="fleet-card-sedan" delay={0.1} />
          <FleetCard data={t.fleet.van} image={IMAGES.fleetVan} testId="fleet-card-van" delay={0.2} />
        </div>
      </div>
    </section>
  );
}
