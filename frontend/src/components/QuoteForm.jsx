import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import AddressInput from "@/components/AddressInput";

const EMPTY = {
  name: "", phone: "", email: "", pickup: "", destination: "",
  date: "", time: "", passengers: 1, luggage: 0, service_type: "", notes: "", privacy: false,
};

const inputCls =
  "w-full bg-anthracite border border-white/10 focus:border-gold/60 px-4 py-3 text-base sm:text-sm text-ivory outline-none transition-colors duration-300 placeholder:text-dim rounded-none";

const Field = ({ label, htmlFor, children }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={htmlFor} className="text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">
      {label}
    </label>
    {children}
  </div>
);

export default function QuoteForm() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const q = t.quote;
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
  };
  const setAddr = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.privacy) {
      toast.error(q.privacyError);
      return;
    }
    setSending(true);
    let ok = false;
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, passengers: Number(form.passengers), luggage: Number(form.luggage), lang }),
      });
      ok = res.ok;
    } catch (err) {
      ok = false;
    }
    if (ok) {
      navigate("/grazie");
    } else {
      toast.error(q.errorToast);
    }
    setSending(false);
  };

  return (
    <section id="preventivo" data-testid="quote-section" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-anthracite/50 to-obsidian" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <Eyebrow>{q.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory">{q.title}</h2>
          <p className="mt-4 text-sm sm:text-base text-sub">{q.subtitle}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            data-testid="quote-form"
            onSubmit={onSubmit}
            className="mt-12 border border-gold/20 bg-obsidian/80 backdrop-blur-md p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <Field label={q.name} htmlFor="q-name">
              <input id="q-name" data-testid="quote-input-name" required autoComplete="name" className={inputCls} value={form.name} onChange={set("name")} />
            </Field>
            <Field label={q.phone} htmlFor="q-phone">
              <input id="q-phone" data-testid="quote-input-phone" required type="tel" autoComplete="tel" inputMode="tel" className={inputCls} value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label={q.email} htmlFor="q-email">
              <input id="q-email" data-testid="quote-input-email" required type="email" autoComplete="email" inputMode="email" className={inputCls} value={form.email} onChange={set("email")} />
            </Field>
            <Field label={q.serviceType} htmlFor="q-service">
              <select id="q-service" data-testid="quote-select-service" required className={inputCls} value={form.service_type} onChange={set("service_type")}>
                <option value="" disabled>{q.selectPlaceholder}</option>
                {q.services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label={q.pickup} htmlFor="q-pickup">
              <AddressInput id="q-pickup" testId="quote-input-pickup" required className={inputCls} value={form.pickup} onChange={setAddr("pickup")} />
            </Field>
            <Field label={q.destination} htmlFor="q-destination">
              <AddressInput id="q-destination" testId="quote-input-destination" required className={inputCls} value={form.destination} onChange={setAddr("destination")} />
            </Field>
            <Field label={q.date} htmlFor="q-date">
              <input id="q-date" data-testid="quote-input-date" required type="date" className={inputCls} value={form.date} onChange={set("date")} />
            </Field>
            <Field label={q.time} htmlFor="q-time">
              <input id="q-time" data-testid="quote-input-time" required type="time" className={inputCls} value={form.time} onChange={set("time")} />
            </Field>
            <Field label={q.passengers} htmlFor="q-passengers">
              <input id="q-passengers" data-testid="quote-input-passengers" type="number" min="1" max="8" className={inputCls} value={form.passengers} onChange={set("passengers")} />
            </Field>
            <Field label={q.luggage} htmlFor="q-luggage">
              <input id="q-luggage" data-testid="quote-input-luggage" type="number" min="0" max="12" className={inputCls} value={form.luggage} onChange={set("luggage")} />
            </Field>
            <div className="sm:col-span-2">
              <Field label={q.notes} htmlFor="q-notes">
                <textarea id="q-notes" data-testid="quote-input-notes" rows={3} className={inputCls} value={form.notes} onChange={set("notes")} />
              </Field>
            </div>
            <p className="sm:col-span-2 text-[10px] text-dim">{q.geoAttribution}</p>
            <label data-testid="quote-privacy-label" className="sm:col-span-2 flex items-start gap-3 cursor-pointer group">
              <input
                data-testid="quote-privacy-checkbox"
                type="checkbox"
                checked={form.privacy}
                onChange={set("privacy")}
                className="mt-1 h-4 w-4 shrink-0 appearance-none border border-gold/50 bg-anthracite checked:bg-gold transition-colors cursor-pointer"
              />
              <span className="text-xs text-sub group-hover:text-ivory transition-colors">{q.privacy}</span>
            </label>
            <button
              data-testid="quote-form-submit"
              type="submit"
              disabled={sending}
              className="sm:col-span-2 py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.25em] uppercase hover:bg-gold-light transition-colors duration-300 disabled:opacity-50"
            >
              {sending ? q.sending : q.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
