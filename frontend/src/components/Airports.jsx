import { Plane } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { scrollTo } from "@/lib/scroll";
import { IMAGES } from "@/config";

export default function Airports() {
  const { t } = useLanguage();
  return (
    <section id="aeroporti" data-testid="airports-section" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMAGES.airports} alt="Torre di controllo e ala d'aereo al tramonto" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/85" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow>{t.airports.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory max-w-3xl leading-tight">
            {t.airports.title}
          </h2>
          <p className="mt-6 max-w-xl text-sm sm:text-base text-sub leading-relaxed">{t.airports.desc}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {t.airports.list.map((a, i) => (
            <Reveal key={a.code} delay={i * 0.12}>
              <div data-testid={`airport-card-${a.code.toLowerCase()}`} className="group bg-obsidian/80 backdrop-blur-sm p-8 lg:p-10 text-center transition-colors duration-500 hover:bg-anthracite/90">
                <Plane size={20} strokeWidth={1.25} className="mx-auto text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                <p className="mt-5 font-serif text-4xl sm:text-5xl tracking-[0.1em] text-ivory group-hover:text-gold-light transition-colors duration-300">
                  {a.code}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sub">{a.name}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12">
          <button
            data-testid="airports-transfer-button"
            onClick={() => scrollTo("#preventivo")}
            className="px-10 py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
          >
            {t.airports.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
