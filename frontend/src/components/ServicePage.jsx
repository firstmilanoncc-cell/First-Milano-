import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n";
import { openWhatsAppForm, default as QuickWhatsApp } from "@/components/QuickWhatsApp";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileCtaBar from "@/components/MobileCtaBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SERVICE_PAGES } from "@/servicePages";

export default function ServicePage({ slug }) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const page = SERVICE_PAGES[slug];
  const c = page[lang];
  const sp = t.servicePage;

  useEffect(() => {
    document.title = c.metaTitle;
    let desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", c.metaDesc);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", `https://firstmilanoncc.it/${slug}`);
    window.scrollTo(0, 0);

    let faqScript = null;
    if (c.faqs?.length) {
      faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.id = "faq-jsonld";
      faqScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
      document.head.appendChild(faqScript);
    }
    return () => faqScript?.remove();
  }, [c, slug]);

  const goQuote = () => {
    navigate("/#preventivo");
  };

  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[52vh] flex items-end overflow-hidden">
          <img src={page.image} alt={c.h1} className="absolute inset-0 w-full h-full object-cover brightness-[1.2]" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-12">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => navigate("/")}
              data-testid="service-back-home"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sub hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Home
            </motion.button>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[11px] uppercase tracking-[0.35em] text-gold font-semibold"
            >
              {c.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory leading-tight max-w-3xl"
            >
              {c.h1}
            </motion.h1>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal>
              <p className="text-base sm:text-lg text-ivory/85 leading-relaxed">{c.intro}</p>
              <div className="mt-10 space-y-0">
                {c.steps.map((s, i) => (
                  <div key={s.t} className="flex gap-5 py-5 border-b border-white/8 last:border-0">
                    <span className="font-serif text-3xl text-gold/40 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h2 className="font-serif text-xl text-ivory">{s.t}</h2>
                      <p className="mt-1.5 text-sm text-sub leading-relaxed">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="border border-gold/20 bg-anthracite p-7 sm:p-9 lg:sticky lg:top-24">
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">FIRST MILANO</h2>
                <ul className="mt-6 space-y-4">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-ivory/85 leading-relaxed">
                      <Check size={15} strokeWidth={2} className="text-gold mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="border border-gold/25 bg-anthracite/60 p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="font-serif text-xl sm:text-2xl text-ivory">{sp.midTitle}</h2>
                  <p className="mt-2 text-sm text-sub">{sp.midText}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
                  <button
                    data-testid="service-mid-quote-button"
                    onClick={goQuote}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gold text-obsidian text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors duration-300"
                  >
                    <CalendarDays size={15} strokeWidth={2} />
                    {sp.quote}
                  </button>
                  <button
                    data-testid="service-mid-whatsapp-button"
                    onClick={openWhatsAppForm}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] text-obsidian text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-[#1DA851] transition-colors duration-300"
                  >
                    <span className="w-4 h-4"><WhatsAppIcon /></span>
                    {sp.whatsapp}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {c.sections?.length > 0 && (
          <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {c.sections.map((s, i) => (
                <Reveal key={s.t} delay={(i % 2) * 0.08}>
                  <div data-testid={`service-info-${i}`} className="border-l-2 border-gold/40 pl-6">
                    <h2 className="font-serif text-xl sm:text-2xl text-ivory">{s.t}</h2>
                    <p className="mt-3 text-sm text-sub leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {c.faqs?.length > 0 && (
          <section className="pb-16 lg:pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal className="text-center flex flex-col items-center">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory">{sp.faqTitle}</h2>
                <span className="mt-5 h-px w-14 bg-gold/60" />
              </Reveal>
              <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
                {c.faqs.map((f, i) => (
                  <details key={f.q} data-testid={`service-faq-${i}`} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-ivory text-sm sm:text-base font-semibold tracking-wide hover:text-gold-light transition-colors">
                      {f.q}
                      <span className="shrink-0 text-gold text-xl font-light transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-sub leading-relaxed pr-8">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="border border-gold/25 bg-anthracite/60 p-8 sm:p-12 text-center">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ivory">{c.ctaTitle}</h2>
                <p className="mt-3 text-sm sm:text-base text-sub max-w-xl mx-auto">{c.ctaText}</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    data-testid="service-quote-button"
                    onClick={goQuote}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
                  >
                    <CalendarDays size={15} strokeWidth={2} />
                    {sp.quote}
                  </button>
                  <button
                    data-testid="service-whatsapp-button"
                    onClick={openWhatsAppForm}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] text-obsidian text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#1DA851] transition-colors duration-300"
                  >
                    <span className="w-4 h-4"><WhatsAppIcon /></span>
                    WhatsApp
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileCtaBar />
      <QuickWhatsApp />
    </>
  );
}
