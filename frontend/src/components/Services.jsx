import { Plane, Briefcase, Clock3, Sparkles, Route, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { scrollTo } from "@/lib/scroll";

const ICONS = [Plane, Briefcase, Clock3, Sparkles, Route, ShieldCheck];

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="servizi" data-testid="services-section" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow>{t.services.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory max-w-2xl leading-tight">
            {t.services.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <button
                  data-testid={`service-card-${i}`}
                  onClick={() => scrollTo("#preventivo")}
                  className="group relative w-full h-full text-left bg-obsidian p-8 lg:p-10 transition-colors duration-500 hover:bg-anthracite"
                >
                  <span className="absolute top-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  <span className="font-serif text-sm text-gold/50">{String(i + 1).padStart(2, "0")}</span>
                  <Icon size={26} strokeWidth={1.25} className="mt-5 text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                  <h3 className="mt-5 font-serif text-xl sm:text-2xl text-ivory group-hover:text-gold-light transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm text-sub leading-relaxed">{s.desc}</p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
