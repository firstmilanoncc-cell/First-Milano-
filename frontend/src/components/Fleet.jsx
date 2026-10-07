import { Check, Users, Luggage, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";
import { scrollTo } from "@/lib/scroll";
import { IMAGES } from "@/config";

const SpecChip = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 border border-white/20 bg-obsidian/50 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory/85">
    <Icon size={13} strokeWidth={1.75} className="text-gold shrink-0" />
    {children}
  </span>
);

const FleetCard = ({ data, image, testId, delay }) => (
  <Reveal delay={delay}>
    <article data-testid={testId} className="group relative h-[560px] lg:h-[640px] overflow-hidden border border-white/10 rounded-3xl shadow-2xl shadow-black/20">
      <img
        src={image}
        alt={`${data.label} — ${data.model}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover brightness-[1.2] transition-transform duration-[1.4s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-11">
        <h3 className="font-serif text-3xl sm:text-4xl text-ivory">{data.label}</h3>
        <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-gold font-semibold">{data.model}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <SpecChip icon={Users}>{data.passengers}</SpecChip>
          <SpecChip icon={Luggage}>{data.luggage}</SpecChip>
          <SpecChip icon={Sparkles}>{data.ideal}</SpecChip>
        </div>
        <p className="mt-4 text-sm text-ivory/75 leading-relaxed max-w-md">{data.desc}</p>
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
        <Reveal delay={0.18} className="mt-10 text-center">
          <button
            onClick={() => scrollTo("#preventivo")}
            className="inline-flex items-center justify-center px-7 py-3.5 border border-gold/50 bg-gold/10 text-gold-light text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold hover:text-obsidian transition-colors duration-300 rounded-xl"
          >
            {t.hero.ctaQuote}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
