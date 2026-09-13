import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, BadgeCheck, Clock, MapPin, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n";
import { scrollTo } from "@/lib/scroll";
import { openWhatsAppForm } from "@/components/QuickWhatsApp";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";
import { IMAGES } from "@/config";

const Line = ({ children, delay = 0, className = "" }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const FEATURE_ICONS = [Plane, BadgeCheck, Clock, MapPin];

export default function Hero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section id="home" ref={ref} data-testid="hero-section" className="relative lg:min-h-[100svh] flex flex-col lg:justify-end overflow-hidden bg-obsidian">
      <div className="lg:hidden relative pt-[70px]">
        <img
          src={IMAGES.hero}
          alt="Piazza del Duomo di Milano di sera con Mercedes nera e autista professionale"
          className="w-full h-auto block"
          loading="eager"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-obsidian" />
      </div>
      <motion.div style={{ y: bgY }} className="hidden lg:block absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Piazza del Duomo di Milano di sera con Mercedes nera e autista professionale"
          className="w-full h-[106%] object-cover object-[center_35%]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/45 to-obsidian/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 pb-10 lg:pt-44 lg:pb-20">
        <Line delay={0.15}>
          <span data-testid="hero-eyebrow" className="inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold font-semibold">
            <span className="h-px w-10 bg-gold/70" />
            {t.hero.eyebrow}
          </span>
        </Line>

        <h1 className="mt-6 font-serif uppercase leading-[0.92] text-ivory">
          <Line delay={0.3}>
            <span data-testid="hero-title-brand" className="text-6xl sm:text-7xl lg:text-9xl tracking-[0.02em]">
              {t.hero.line1}
            </span>
          </Line>
          <Line delay={0.42}>
            <span className="text-6xl sm:text-7xl lg:text-9xl tracking-[0.02em]">
              {t.hero.line2}
            </span>
          </Line>
        </h1>

        <Line delay={0.55}>
          <span data-testid="hero-title-sub" className="block mt-5 text-xs sm:text-sm tracking-[0.45em] uppercase text-gold-light">
            {t.hero.title2}
          </span>
        </Line>

        <Line delay={0.68}>
          <span data-testid="hero-tagline" className="block mt-6 font-serif italic text-lg sm:text-2xl text-ivory/90">
            {t.hero.tagline}
          </span>
        </Line>

        <motion.p
          data-testid="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-5 max-w-xl text-sm sm:text-base text-ivory/70 leading-relaxed"
        >
          {t.hero.desc}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            data-testid="hero-quote-button"
            onClick={() => scrollTo("#preventivo")}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
          >
            <CalendarDays size={15} strokeWidth={2} />
            {t.hero.ctaQuote}
          </button>
          <button
            data-testid="hero-whatsapp-button"
            onClick={openWhatsAppForm}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-ivory/40 text-ivory text-xs font-semibold tracking-[0.2em] uppercase hover:border-gold hover:text-gold-light transition-colors duration-300"
          >
            <span className="w-4 h-4"><WhatsAppIcon /></span>
            {t.hero.ctaWhats}
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 border-t border-white/10 bg-obsidian/70 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {t.hero.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={f.title} data-testid={`hero-feature-${i}`} className="flex items-start gap-3 px-4 py-5 sm:px-6">
                <Icon size={18} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-ivory">{f.title}</p>
                  <p className="text-[11px] sm:text-xs text-dim mt-1">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
