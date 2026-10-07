import { Star } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";
import { REVIEWS, PARTNERS } from "@/config";

// Sezione prova sociale: viene mostrata SOLO se in config.js sono presenti
// recensioni Google reali (REVIEWS) o loghi partner autorizzati (PARTNERS).
// Con entrambi gli elenchi vuoti non renderizza nulla: nessun dato inventato.
export default function Reviews() {
  const { t } = useLanguage();
  if (REVIEWS.length === 0 && PARTNERS.length === 0) return null;

  return (
    <section id="recensioni" data-testid="reviews-section" className="bg-cream py-20 lg:py-28 border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-golddeep font-semibold">{t.reviews.eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight max-w-3xl">{t.reviews.title}</h2>
          <span className="mt-6 h-px w-16 bg-golddeep/60" />
        </Reveal>

        {REVIEWS.length > 0 && (
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={i * 0.08}>
                <figure data-testid={`review-card-${i}`} className="h-full bg-white border border-ink/8 p-7 flex flex-col">
                  <div className="flex gap-1" aria-label={`${r.rating} / 5`}>
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} size={14} className="text-golddeep fill-golddeep" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm text-[#6B6659] leading-relaxed flex-1">“{r.text}”</blockquote>
                  <figcaption className="mt-5 text-[11px] uppercase tracking-[0.18em] text-ink font-semibold">
                    {r.name} <span className="text-[#6B6659] font-normal">· Google · {r.date}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        {PARTNERS.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {PARTNERS.map((p) => (
              <img key={p.name} src={p.logo} alt={p.name} loading="lazy" className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
