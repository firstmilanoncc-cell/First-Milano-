import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";

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
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {t.why.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.1}>
              <div data-testid={`why-chapter-${item.n}`} className="group text-center sm:text-left">
                <span className="font-serif text-5xl sm:text-6xl text-golddeep/30 group-hover:text-golddeep/70 transition-colors duration-500">
                  {item.n}
                </span>
                <div className="mt-4 h-px w-12 bg-golddeep/50 mx-auto sm:mx-0 group-hover:w-20 transition-all duration-500" />
                <h3 className="mt-5 font-serif text-xl sm:text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-[#6B6659] leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
