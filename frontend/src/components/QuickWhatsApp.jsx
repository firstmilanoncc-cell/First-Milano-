import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n";
import { CONTACTS } from "@/config";
import AddressInput from "@/components/AddressInput";

const EMPTY = { name: "", from: "", to: "", date: "", time: "", passengers: 1, service: "", notes: "" };

const inputCls =
  "w-full bg-obsidian border border-white/10 focus:border-gold/60 px-4 py-3 text-sm text-ivory outline-none transition-colors duration-300 placeholder:text-dim rounded-none";

export const openWhatsAppForm = () => window.dispatchEvent(new CustomEvent("open-wa-form"));

export default function QuickWhatsApp() {
  const { t } = useLanguage();
  const w = t.waForm;
  const q = t.quote;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-wa-form", handler);
    return () => window.removeEventListener("open-wa-form", handler);
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setAddr = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const msg = [
      w.waIntro,
      `${w.name}: ${form.name}`,
      `${q.serviceType}: ${form.service}`,
      `${w.from}: ${form.from}`,
      `${w.to}: ${form.to}`,
      `${w.date}: ${form.date} — ${w.time}: ${form.time}`,
      `${w.passengers}: ${form.passengers}`,
      form.notes ? `${w.notes}: ${form.notes}` : null,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${CONTACTS.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="wa-form-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-obsidian/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg border border-gold/25 bg-anthracite p-6 sm:p-8 max-h-[92svh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-ivory">{w.title}</h3>
                <p className="mt-2 text-xs text-sub leading-relaxed">{w.subtitle}</p>
              </div>
              <button
                data-testid="wa-form-close"
                onClick={() => setOpen(false)}
                aria-label={w.close}
                className="text-sub hover:text-gold transition-colors shrink-0 mt-1"
              >
                <X size={20} />
              </button>
            </div>

            <form data-testid="wa-quick-form" onSubmit={submit} className="mt-6 grid grid-cols-2 gap-4">
              <input data-testid="wa-input-name" required placeholder={w.name} className={`${inputCls} col-span-2`} value={form.name} onChange={set("name")} />
              <select data-testid="wa-select-service" required className={`${inputCls} col-span-2`} value={form.service} onChange={set("service")}>
                <option value="" disabled>{q.selectPlaceholder}</option>
                {q.services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <AddressInput id="wa-from" testId="wa-input-from" required placeholder={w.from} className={inputCls} value={form.from} onChange={setAddr("from")} />
              <AddressInput id="wa-to" testId="wa-input-to" required placeholder={w.to} className={inputCls} value={form.to} onChange={setAddr("to")} />
              <input data-testid="wa-input-date" required type="date" className={inputCls} value={form.date} onChange={set("date")} />
              <input data-testid="wa-input-time" required type="time" className={inputCls} value={form.time} onChange={set("time")} />
              <input data-testid="wa-input-passengers" type="number" min="1" max="8" placeholder={w.passengers} className={inputCls} value={form.passengers} onChange={set("passengers")} />
              <input data-testid="wa-input-notes" placeholder={w.notes} className={inputCls} value={form.notes} onChange={set("notes")} />
              <p className="col-span-2 text-[10px] text-dim">{t.quote.geoAttribution}</p>
              <button
                data-testid="wa-form-submit"
                type="submit"
                className="col-span-2 py-4 bg-[#25D366] text-obsidian text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#20BA5A] transition-colors duration-300"
              >
                {w.submit}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
