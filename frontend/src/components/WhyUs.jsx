import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";

export default function WhyUs() {
  const { t } = useLanguage();
  return (
    <section id="chi-siamo" data-testid="why-section" className="py-20 lg:py-32 bg-anthracite/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t.why.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory">{t.why.title}</h2>
          <p className="mt-5 text-sm sm:text-base text-sub leading-relaxed">{t.why.intro}</p>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {t.why.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.1}>
              <div data-testid={`why-chapter-${item.n}`} className="group">
                <span className="font-serif text-5xl sm:text-6xl text-gold/25 group-hover:text-gold/60 transition-colors duration-500">
                  {item.n}
                </span>
                <div className="mt-4 h-px w-12 bg-gold/50 group-hover:w-20 transition-all duration-500" />
                <h3 className="mt-5 font-serif text-xl sm:text-2xl text-ivory">{item.title}</h3>
                <p className="mt-3 text-sm text-sub leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
