import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { scrollTo, useScrollLock } from "@/lib/scroll";

const NAV = [
  { hash: "#home", key: "home" },
  { hash: "#servizi", key: "servizi" },
  { hash: "#flotta", key: "flotta" },
  { hash: "#aeroporti", key: "aeroporti" },
  { hash: "#guardia", key: "guardia" },
  { hash: "#chi-siamo", key: "chisiamo" },
  { hash: "#contatti", key: "contatti" },
];

const LangSwitch = ({ lang, setLang, testPrefix }) => (
  <div className="flex items-center border border-white/15 overflow-hidden" data-testid={`${testPrefix}-lang-switcher`}>
    {["it", "en"].map((l) => (
      <button
        key={l}
        data-testid={`${testPrefix}-lang-${l}`}
        onClick={() => setLang(l)}
        className={`px-2.5 py-1.5 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
          lang === l ? "bg-gold text-obsidian font-semibold" : "text-sub hover:text-ivory"
        }`}
      >
        {l}
      </button>
    ))}
  </div>
);

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(open);

  const go = (hash) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
      return;
    }
    scrollTo(hash);
  };

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-obsidian/95 backdrop-blur-xl border-b border-gold/25 shadow-2xl"
            : "bg-obsidian/60 backdrop-blur-md border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[70px]">
          <button data-testid="brand-logo" onClick={() => go("#home")} className="text-left group">
            <span className="block font-serif text-lg sm:text-xl tracking-[0.18em] text-ivory group-hover:text-gold-light transition-colors duration-300 whitespace-nowrap">
              FIRST MILANO
            </span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-gold whitespace-nowrap">
              Private Chauffeur Service
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-7" data-testid="desktop-nav">
            {NAV.map((item) => (
              <button
                key={item.hash}
                data-testid={`nav-link-${item.key}`}
                onClick={() => go(item.hash)}
                className="text-[12px] tracking-[0.14em] uppercase text-sub hover:text-gold-light transition-colors duration-300 whitespace-nowrap"
              >
                {t.nav[item.key]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch lang={lang} setLang={setLang} testPrefix="header" />
            <button
              data-testid="nav-preventivo-button"
              onClick={() => go("#preventivo")}
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-gold text-obsidian text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              {t.nav.cta}
            </button>
            <button
              data-testid="mobile-menu-button"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2 text-ivory hover:text-gold transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl xl:hidden flex flex-col justify-center overflow-y-auto px-8 pt-24 pb-10"
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((item, i) => (
                <motion.button
                  key={item.hash}
                  data-testid={`mobile-nav-link-${item.key}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => go(item.hash)}
                  className="text-left font-serif text-3xl py-3 text-ivory hover:text-gold-light border-b border-white/5 transition-colors"
                >
                  {t.nav[item.key]}
                </motion.button>
              ))}
            </nav>
            <motion.button
              data-testid="mobile-nav-preventivo-button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => go("#preventivo")}
              className="mt-8 w-full py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase"
            >
              {t.nav.cta}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
