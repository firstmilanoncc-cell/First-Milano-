import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { scrollTo } from "@/lib/scroll";
import { IMAGES } from "@/config";

export default function Bodyguard() {
  const { t } = useLanguage();
  return (
    <section id="guardia" data-testid="guard-section" className="py-20 lg:py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold/30 pointer-events-none" />
            <img
              src={IMAGES.guard}
              alt="Professionista della protezione personale in abito elegante accanto a una vettura premium"
              loading="lazy"
              className="relative w-full aspect-[2/1] sm:aspect-[21/10] object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <Eyebrow>{t.guard.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">{t.guard.title}</h2>
          <p className="mt-6 text-sm sm:text-base text-sub leading-relaxed">{t.guard.p1}</p>
          <p className="mt-4 text-sm sm:text-base text-sub leading-relaxed">{t.guard.p2}</p>
          <div className="mt-6 flex items-start gap-3 border-l-2 border-gold/50 pl-4">
            <ShieldCheck size={18} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" />
            <p className="text-xs sm:text-sm text-dim leading-relaxed italic">{t.guard.note}</p>
          </div>
          <button
            data-testid="guard-info-button"
            onClick={() => scrollTo("#preventivo")}
            className="mt-10 px-10 py-4 border border-gold/60 text-gold-light text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-colors duration-300"
          >
            {t.guard.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
