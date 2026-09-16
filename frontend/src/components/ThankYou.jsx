import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { openWhatsAppForm, default as QuickWhatsApp } from "@/components/QuickWhatsApp";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";

const COPY = {
  it: {
    title: "Grazie per averci contattato",
    text: "La tua richiesta è stata ricevuta. Ti ricontatteremo al più presto con una proposta personalizzata per il tuo viaggio.",
    sub: "Hai urgenza? Scrivici subito su WhatsApp:",
    whatsapp: "Contattaci su WhatsApp",
    home: "Torna alla home",
  },
  en: {
    title: "Thank you for contacting us",
    text: "Your request has been received. We will get back to you shortly with a tailored proposal for your journey.",
    sub: "In a hurry? Message us on WhatsApp now:",
    whatsapp: "Contact us on WhatsApp",
    home: "Back to home",
  },
};

export default function ThankYou() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const c = COPY[lang] || COPY.it;

  useEffect(() => {
    document.title = "Grazie | FIRST MILANO";
    let robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute("content", "noindex, nofollow");
    window.scrollTo(0, 0);
    return () => {
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, []);

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <motion.div
        data-testid="thank-you-page"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-md w-full text-center border border-gold/25 bg-anthracite p-10"
      >
        <div className="flex justify-center">
          <CheckCircle2 size={44} strokeWidth={1.25} className="text-gold" />
        </div>
        <p className="font-serif text-xl tracking-[0.18em] text-ivory mt-6">FIRST MILANO</p>
        <p className="text-[9px] tracking-[0.3em] uppercase text-gold mt-1">Private Chauffeur Service</p>
        <div className="my-6 h-px w-16 bg-gold/50 mx-auto" />
        <h1 data-testid="thank-you-title" className="font-serif text-2xl sm:text-3xl text-ivory">{c.title}</h1>
        <p className="mt-4 text-sm text-sub leading-relaxed">{c.text}</p>
        <p className="mt-8 text-xs text-dim">{c.sub}</p>
        <button
          data-testid="thank-you-whatsapp-button"
          onClick={openWhatsAppForm}
          className="mt-3 w-full inline-flex items-center justify-center gap-2.5 py-4 bg-[#25D366] text-obsidian text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#20BA5A] transition-colors"
        >
          <span className="w-4 h-4"><WhatsAppIcon /></span>
          {c.whatsapp}
        </button>
        <button
          data-testid="thank-you-home-button"
          onClick={() => navigate("/")}
          className="mt-3 w-full py-3.5 border border-white/15 text-sub text-xs font-semibold tracking-[0.2em] uppercase hover:border-gold hover:text-gold-light transition-colors"
        >
          {c.home}
        </button>
      </motion.div>
      <QuickWhatsApp />
    </div>
  );
}
