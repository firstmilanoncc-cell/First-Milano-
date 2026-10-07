import { CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n";
import { scrollTo } from "@/lib/scroll";
import { openWhatsAppForm } from "@/components/QuickWhatsApp";
import { WhatsAppIcon } from "@/components/FloatingWhatsApp";

// Barra CTA fissa solo mobile: non copre i contenuti (il footer ha padding bottom)
// e resta sotto menu e modali (z-30 contro z-40/60).
export default function MobileCtaBar() {
  const { t } = useLanguage();
  return (
    <div
      data-testid="mobile-cta-bar"
      className="fixed bottom-0 inset-x-0 z-30 lg:hidden grid grid-cols-2 border-t border-white/10 bg-obsidian/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <button
        data-testid="mobile-bar-whatsapp"
        onClick={openWhatsAppForm}
        className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-obsidian text-[11px] font-bold tracking-[0.18em] uppercase rounded-none"
      >
        <span className="w-4 h-4"><WhatsAppIcon /></span>
        WhatsApp
      </button>
      <button
        data-testid="mobile-bar-quote"
        onClick={() => scrollTo("#preventivo")}
        className="flex items-center justify-center gap-2 py-4 bg-gold text-obsidian text-[11px] font-bold tracking-[0.18em] uppercase rounded-none"
      >
        <CalendarDays size={15} strokeWidth={2} />
        {t.mobileBar.quote}
      </button>
    </div>
  );
}
