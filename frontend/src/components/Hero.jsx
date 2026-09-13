import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, BadgeCheck, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";
import { scrollTo } from "@/lib/scroll";
import { CONTACTS, IMAGES } from "@/config";

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
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const waLink = `https://wa.me/${CONTACTS.whatsappNumber}?text=${encodeURIComponent(t.hero.ctaWhats)}`;

  return (
    <section id="home" ref={ref} data-testid="hero-section" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Piazza del Duomo di Milano al tramonto con Mercedes nera e autista professionale"
          className="w-full h-[115%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/45 to-obsidian" />
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-10 sm:pb-16">
        <Line delay={0.15}>
          <span data-testid="hero-eyebrow" className="inline-flex items-center gap-3 text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold font-semibold">
            <span className="h-px w-10 bg-gold/70" />
            {t.hero.eyebrow}
          </span>
        </Line>

        <h1 className="mt-6 font-serif uppercase leading-[0.95]">
          <Line delay={0.3}>
            <span data-testid="hero-title-brand" className="text-5xl sm:text-7xl lg:text-8xl tracking-[0.06em] text-ivory">
              {t.hero.title1}
            </span>
          </Line>
          <Line delay={0.45}>
            <span data-testid="hero-title-sub" className="block mt-2 text-xl sm:text-3xl lg:text-4xl tracking-[0.35em] text-gold-light">
              {t.hero.title2}
            </span>
          </Line>
        </h1>

        <Line delay={0.6}>
          <span data-testid="hero-tagline" className="block mt-6 font-serif italic text-lg sm:text-2xl text-ivory/90">
            {t.hero.tagline}
          </span>
        </Line>

        <motion.p
          data-testid="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-5 max-w-xl text-sm sm:text-base text-sub leading-relaxed"
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
            className="px-8 py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-colors duration-300"
          >
            {t.hero.ctaQuote}
          </button>
          <a
            data-testid="hero-whatsapp-button"
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-gold/50 text-gold-light text-xs font-semibold tracking-[0.2em] uppercase text-center hover:bg-gold/10 hover:border-gold transition-colors duration-300"
          >
            {t.hero.ctaWhats}
          </a>
        </motion.div>
      </motion.div>

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
