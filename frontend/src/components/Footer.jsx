import { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, X, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n";
import { scrollTo, useScrollLock } from "@/lib/scroll";
import { CONTACTS, AREA } from "@/config";

const NAV = [
  { hash: "#home", key: "home" },
  { hash: "#servizi", key: "servizi" },
  { hash: "#flotta", key: "flotta" },
  { hash: "#aeroporti", key: "aeroporti" },
  { hash: "#guardia", key: "guardia" },
  { hash: "#chi-siamo", key: "chisiamo" },
  { hash: "#contatti", key: "contatti" },
];

const SERVICE_LINKS = [
  { path: "/transfer-malpensa", label: "Transfer Malpensa" },
  { path: "/transfer-linate", label: "Transfer Linate" },
  { path: "/transfer-orio-al-serio", label: "Transfer Orio al Serio" },
  { path: "/autista-a-disposizione", label: "Autista a Disposizione" },
  { path: "/eventi-fashion-week", label: "Eventi & Fashion Week" },
  { path: "/milano-lago-di-como", label: "Milano – Lago di Como" },
  { path: "/milano-st-moritz", label: "Milano – St. Moritz" },
  { path: "/milano-portofino", label: "Milano – Portofino" },
  { path: "/milano-venezia", label: "Milano – Venezia" },
  { path: "/milano-firenze", label: "Milano – Firenze" },
  { path: "/milano-roma", label: "Milano – Roma" },
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

  useScrollLock(!!modal);

  const socials = [
    { id: "facebook", icon: Facebook, url: CONTACTS.social.facebook },
    { id: "instagram", icon: Instagram, url: CONTACTS.social.instagram },
    { id: "linkedin", icon: Linkedin, url: CONTACTS.social.linkedin },
  ];

  const contactRows = [
    { id: "phone", icon: Phone, value: CONTACTS.phoneDisplay, href: `tel:${CONTACTS.phoneRaw}` },
    { id: "whatsapp", icon: MessageCircle, value: CONTACTS.whatsappDisplay, href: `https://wa.me/${CONTACTS.whatsappNumber}` },
    { id: "email", icon: Mail, value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { id: "address", icon: MapPin, value: CONTACTS.address, href: null },
  ];

  const half = Math.ceil(NAV.length / 2);

  return (
    <footer id="contatti" data-testid="main-footer" className="border-t border-gold/15 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-12">
        <div>
          <p className="font-serif text-xl tracking-[0.18em] text-ivory">FIRST MILANO</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mt-1">Private Chauffeur Service</p>
          <p className="mt-5 text-sm text-sub leading-relaxed max-w-xs">{t.footer.tagline}</p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">{t.footer.area}</p>
          <p data-testid="footer-area" className="mt-2 text-sm text-sub">{AREA}</p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">{t.footer.contactsTitle}</p>
          <ul className="mt-5 space-y-3.5">
            {contactRows.map(({ id, icon: Icon, value, href }) => (
              <li key={id}>
                {href ? (
                  <a data-testid={`footer-contact-${id}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 text-sm text-sub hover:text-gold-light transition-colors duration-300">
                    <Icon size={15} strokeWidth={1.5} className="text-gold shrink-0" />
                    {value}
                  </a>
                ) : (
                  <span data-testid={`footer-contact-${id}`} className="flex items-center gap-3 text-sm text-sub">
                    <Icon size={15} strokeWidth={1.5} className="text-gold shrink-0" />
                    {value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold font-semibold">{t.footer.links}</p>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {[NAV.slice(0, half), NAV.slice(half)].map((col, ci) => (
              <ul key={ci} className="space-y-2.5">
                {col.map((item) => (
                  <li key={item.hash}>
                    <button
                      data-testid={`footer-link-${item.key}`}
                      onClick={() => {
                        if (window.location.pathname !== "/") {
                          window.location.href = "/" + item.hash;
                          return;
                        }
                        scrollTo(item.hash);
                      }}
                      className="text-[13px] tracking-[0.08em] uppercase text-sub hover:text-gold-light transition-colors duration-300"
                    >
                      {t.nav[item.key]}
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {SERVICE_LINKS.map((s) => (
              <li key={s.path}>
                <a
                  data-testid={`footer-service-${s.path.slice(1)}`}
                  href={s.path}
                  className="text-[12px] text-dim hover:text-gold-light transition-colors duration-300"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex gap-3">
            {socials.map(({ id, icon: Icon, url }) => (
              <a
                key={id}
                data-testid={`social-${id}`}
                href={url || "#"}
                target={url ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={id}
                className="p-2.5 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-colors duration-300"
              >
                <Icon size={15} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-dim">© {new Date().getFullYear()} FIRST MILANO. {t.footer.rights}</p>
          <div className="flex items-center gap-4 text-xs text-dim">
            <button data-testid="footer-privacy-link" onClick={() => setModal("privacy")} className="hover:text-gold-light transition-colors">
              {t.footer.privacy}
            </button>
            <span className="text-white/10">|</span>
            <button data-testid="footer-cookie-link" onClick={() => setModal("cookie")} className="hover:text-gold-light transition-colors">
              {t.footer.cookie}
            </button>
          </div>
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
