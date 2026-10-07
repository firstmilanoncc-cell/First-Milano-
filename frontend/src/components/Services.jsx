import { Plane, Briefcase, Clock3, Gem, MapPin, ShieldCheck, Route } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";

const ICONS = [Plane, Briefcase, Clock3, Gem, MapPin, ShieldCheck, Route];

export default function Services() {
  const { t } = useLanguage();
  return (
    <section id="servizi" data-testid="services-section" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-golddeep font-semibold">{t.services.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight max-w-3xl">
            {t.services.title}
          </h2>
          <span className="mt-6 h-px w-16 bg-golddeep/60" />
        </Reveal>

        <div className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-12">
          {t.services.items.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.07} className="w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]">
                <div data-testid={`service-card-${i}`} className="group text-center h-full">
                  <Icon
                    size={30}
                    strokeWidth={1.1}
                    className="mx-auto text-golddeep transition-transform duration-500 group-hover:-translate-y-1.5"
                  />
                  <h3 className="mt-5 text-[12px] sm:text-[13px] font-bold tracking-[0.12em] uppercase text-ink leading-snug">
                    {s.title}
                  </h3>
                  <span className="block mt-3 h-px w-8 mx-auto bg-golddeep/40 group-hover:w-12 group-hover:bg-golddeep transition-all duration-500" />
                  <p className="mt-3 text-[13px] text-[#6B6659] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
