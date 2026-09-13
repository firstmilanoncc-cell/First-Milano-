import { useLanguage } from "@/i18n";

export default function Marquee() {
  const { t } = useLanguage();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div data-testid="editorial-marquee" className="relative overflow-hidden border-y border-gold/10 bg-anthracite/40 py-5 select-none">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif italic text-xl sm:text-2xl text-ivory/50 px-6">{item}</span>
            <span className="text-gold/60 text-[10px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
