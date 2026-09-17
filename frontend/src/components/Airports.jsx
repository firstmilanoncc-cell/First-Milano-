import { Plane, ShieldCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";
import { scrollTo } from "@/lib/scroll";
import { IMAGES } from "@/config";

const Panel = ({ id, image, icon: Icon, eyebrow, title, text, note, cta, testId }) => (
  <div
    id={id}
    data-testid={testId}
    className="group relative overflow-hidden min-h-[480px] lg:min-h-[560px] flex items-end"
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover brightness-[1.2] transition-transform duration-[1.4s] ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />
    <div className="relative p-8 sm:p-10 lg:p-14">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold mb-4">{eyebrow}</p>
      )}
      <Icon size={26} strokeWidth={1.25} className="text-gold" />
      <h3 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.6rem] text-ivory uppercase leading-tight">{title}</h3>
      <p className="mt-4 text-sm text-ivory/70 leading-relaxed max-w-md">{text}</p>
      {note && <p className="mt-3 text-[11px] text-ivory/45 italic max-w-md leading-relaxed">{note}</p>}
      <button
        data-testid={`${testId}-cta`}
        onClick={() => scrollTo("#preventivo")}
        className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-light hover:text-gold hover:gap-3.5 transition-all duration-300"
      >
        {cta}
        <ArrowRight size={14} strokeWidth={2} />
      </button>
    </div>
  </div>
);

export default function Airports() {
  const { t } = useLanguage();
  return (
    <section id="aeroporti" data-testid="airports-section" className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border-y border-white/5">
      <Reveal>
        <Panel
          image={IMAGES.airports}
          icon={Plane}
          title={t.airports.title}
          text={t.airports.desc}
          cta={t.airports.cta}
          testId="panel-airports"
        />
      </Reveal>
      <Reveal delay={0.12}>
        <Panel
          id="guardia"
          image={IMAGES.guard}
          icon={ShieldCheck}
          eyebrow={t.guard.eyebrow}
          title={t.guard.title}
          text={t.guard.text}
          note={t.guard.note}
          cta={t.guard.cta}
          testId="panel-guard"
        />
      </Reveal>
    </section>
  );
}
