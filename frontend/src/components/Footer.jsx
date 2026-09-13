import { useState } from "react";
import { Instagram, Facebook, Linkedin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n";
import { scrollTo } from "@/lib/scroll";
import { CONTACTS } from "@/config";

const NAV = [
  { hash: "#home", key: "home" },
  { hash: "#servizi", key: "servizi" },
  { hash: "#flotta", key: "flotta" },
  { hash: "#aeroporti", key: "aeroporti" },
  { hash: "#guardia", key: "guardia" },
  { hash: "#chi-siamo", key: "chisiamo" },
  { hash: "#contatti", key: "contatti" },
];

const LegalModal = ({ title, body, onClose, closeLabel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[60] bg-obsidian/90 backdrop-blur-sm flex items-center justify-center px-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 24, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="max-w-lg w-full border border-gold/25 bg-anthracite p-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-ivory">{title}</h3>
        <button data-testid="legal-modal-close" onClick={onClose} aria-label={closeLabel} className="text-sub hover:text-gold transition-colors">
          <X size={20} />
        </button>
      </div>
      <p className="mt-4 text-sm text-sub leading-relaxed whitespace-pre-line max-h-[55vh] overflow-y-auto pr-2">{body}</p>
    </motion.div>
  </motion.div>
);

export default function Footer() {
  const { t } = useLanguage();
  const [modal, setModal] = useState(null);

  const socials = [
    { id: "instagram", icon: Instagram, url: CONTACTS.social.instagram },
    { id: "facebook", icon: Facebook, url: CONTACTS.social.facebook },
    { id: "linkedin", icon: Linkedin, url: CONTACTS.social.linkedin },
  ];

  return (
    <footer data-testid="main-footer" className="border-t border-gold/15 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-xl tracking-[0.18em] text-ivory">FIRST MILANO</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mt-1">Private Chauffeur Service</p>
          <p className="mt-5 text-sm text-sub leading-relaxed max-w-xs">{t.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ id, icon: Icon, url }) => (
              <a
                key={id}
                data-testid={`social-${id}`}
                href={url || "#"}
                target={url ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={id}
                className="p-2.5 border border-white/10 text-sub hover:text-gold hover:border-gold/50 transition-colors duration-300"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">{t.footer.links}</p>
          <ul className="mt-5 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.hash}>
                <button
                  data-testid={`footer-link-${item.key}`}
                  onClick={() => scrollTo(item.hash)}
                  className="text-sm text-sub hover:text-gold-light transition-colors duration-300"
                >
                  {t.nav[item.key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">{t.footer.legal}</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <button data-testid="footer-privacy-link" onClick={() => setModal("privacy")} className="text-sm text-sub hover:text-gold-light transition-colors duration-300">
                {t.footer.privacy}
              </button>
            </li>
            <li>
              <button data-testid="footer-cookie-link" onClick={() => setModal("cookie")} className="text-sm text-sub hover:text-gold-light transition-colors duration-300">
                {t.footer.cookie}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dim">© {new Date().getFullYear()} FIRST MILANO — {t.footer.rights}</p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-dim">Milano, Italia</p>
        </div>
      </div>

      <AnimatePresence>
        {modal === "privacy" && (
          <LegalModal title={t.legal.privacyTitle} body={t.legal.privacyBody} closeLabel={t.legal.close} onClose={() => setModal(null)} />
        )}
        {modal === "cookie" && (
          <LegalModal title={t.legal.cookieTitle} body={t.legal.cookieBody} closeLabel={t.legal.close} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </footer>
  );
}
