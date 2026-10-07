import { BadgeCheck, Clock, Plane, UserCheck, Car, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";

const ICONS = [BadgeCheck, Clock, Plane, UserCheck, Car, CalendarCheck];

export default function WhyUs() {
  const { t } = useLanguage();
  return (
    <section id="chi-siamo" data-testid="why-section" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-golddeep font-semibold">{t.why.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight max-w-3xl">
            {t.why.title}
          </h2>
          <span className="mt-6 h-px w-16 bg-golddeep/60" />
          <p className="mt-6 max-w-xl text-sm sm:text-base text-[#6B6659] leading-relaxed">{t.why.intro}</p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {t.why.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.07}>
                <div data-testid={`why-item-${i}`} className="group text-center sm:text-left">
                  <span className="inline-flex items-center justify-center w-12 h-12 border border-golddeep/30 text-golddeep transition-colors duration-500 group-hover:bg-golddeep group-hover:text-cream">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl sm:text-2xl text-ink">{item.title}</h3>
                  <span className="block mt-3 h-px w-10 bg-golddeep/50 mx-auto sm:mx-0 group-hover:w-16 transition-all duration-500" />
                  <p className="mt-3 text-sm text-[#6B6659] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
