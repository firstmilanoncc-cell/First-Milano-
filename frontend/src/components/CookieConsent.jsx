import { useEffect, useState } from "react";
import { ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { applyConsent, getStoredConsent, saveConsent, trackPageView } from "@/analytics";

const DEFAULT_PREFS = { analytics: false, marketing: false };

export default function CookieConsent() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(() => !getStoredConsent());
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [prefs, setPrefs] = useState(() => getStoredConsent() || DEFAULT_PREFS);

  useEffect(() => {
    const saved = getStoredConsent();
    if (saved) applyConsent(saved);

    const reopen = () => {
      setPrefs(getStoredConsent() || DEFAULT_PREFS);
      setPreferencesOpen(true);
      setOpen(true);
    };
    window.addEventListener("firstmilano:cookie-settings", reopen);
    return () => window.removeEventListener("firstmilano:cookie-settings", reopen);
  }, []);

  const commit = (next) => {
    saveConsent(next);
    applyConsent(next);
    setPrefs(next);
    setOpen(false);
    setPreferencesOpen(false);
    if (next.analytics) trackPageView();
  };

  if (!open) return null;

  return (
    <div
      data-testid="cookie-consent"
      className="fixed inset-x-3 bottom-20 sm:bottom-5 z-[70] mx-auto max-w-3xl rounded-2xl border border-gold/25 bg-obsidian/95 p-5 sm:p-6 shadow-2xl shadow-black/50 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={t.cookieConsent.title}
    >
      <div className="flex items-start gap-4">
        <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
          <ShieldCheck size={19} strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-xl text-ivory">{t.cookieConsent.title}</p>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-sub">{t.cookieConsent.text}</p>
            </div>
            {getStoredConsent() && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-lg p-2 text-dim hover:bg-white/5 hover:text-ivory"
                aria-label={t.cookieConsent.close}
              >
                <X size={17} />
              </button>
            )}
          </div>

          {preferencesOpen && (
            <div className="mt-5 grid gap-3 border-y border-white/10 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ivory">{t.cookieConsent.necessary}</p>
                  <p className="mt-1 text-xs text-dim">{t.cookieConsent.necessaryText}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-gold">{t.cookieConsent.alwaysOn}</span>
              </div>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-semibold text-ivory">{t.cookieConsent.analytics}</span>
                  <span className="mt-1 block text-xs text-dim">{t.cookieConsent.analyticsText}</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                  className="h-5 w-5 accent-[#D4AF37]"
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-semibold text-ivory">{t.cookieConsent.marketing}</span>
                  <span className="mt-1 block text-xs text-dim">{t.cookieConsent.marketingText}</span>
                </span>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                  className="h-5 w-5 accent-[#D4AF37]"
                />
              </label>
            </div>
          )}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
            {!preferencesOpen ? (
              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory hover:border-gold/40"
              >
                <SlidersHorizontal size={14} />
                {t.cookieConsent.preferences}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => commit(prefs)}
                className="rounded-xl border border-gold/45 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-light hover:bg-gold/10"
              >
                {t.cookieConsent.save}
              </button>
            )}
            <button
              type="button"
              onClick={() => commit({ analytics: false, marketing: false })}
              className="rounded-xl border border-white/15 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sub hover:text-ivory"
            >
              {t.cookieConsent.reject}
            </button>
            <button
              type="button"
              onClick={() => commit({ analytics: true, marketing: true })}
              className="rounded-xl bg-gold px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-obsidian hover:bg-gold-light"
            >
              {t.cookieConsent.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
