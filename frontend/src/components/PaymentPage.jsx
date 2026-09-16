import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Lock, Copy, MessageCircle, RefreshCw, CreditCard } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

const inputCls =
  "w-full bg-obsidian border border-white/10 focus:border-gold/60 px-4 py-3 text-base sm:text-sm text-ivory outline-none transition-colors duration-300 placeholder:text-dim rounded-none";

const STATUS_LABELS = {
  pending: { label: "In attesa", cls: "text-gold border-gold/40" },
  paid: { label: "Pagato", cls: "text-[#25D366] border-[#25D366]/40" },
  failed: { label: "Fallito", cls: "text-red-400 border-red-400/40" },
  expired: { label: "Scaduto", cls: "text-dim border-white/15" },
  refunded: { label: "Rimborsato", cls: "text-dim border-white/15" },
};

export default function PaymentPage() {
  const [pin, setPin] = useState(sessionStorage.getItem("pay_pin") || "");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [form, setForm] = useState({ amount: "", reference: "", client_name: "", description: "Servizio NCC FIRST MILANO" });
  const [creating, setCreating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [payments, setPayments] = useState([]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const loadPayments = async (p) => {
    const res = await fetch(`${API}/api/payments?pin=${encodeURIComponent(p)}`);
    if (!res.ok) throw new Error("pin");
    const data = await res.json();
    setPayments(data.payments || []);
  };

  const unlock = async (e) => {
    e.preventDefault();
    setChecking(true);
    try {
      await loadPayments(pin);
      sessionStorage.setItem("pay_pin", pin);
      setUnlocked(true);
    } catch (err) {
      toast.error("PIN non valido");
    }
    setChecking(false);
  };

  useEffect(() => {
    if (pin) {
      loadPayments(pin).then(() => setUnlocked(true)).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createLink = async (e) => {
    e.preventDefault();
    const amount = parseFloat(String(form.amount).replace(",", "."));
    if (!amount || amount < 1) {
      toast.error("Inserisci un importo valido");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch(`${API}/api/payments/create-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount, pin, origin_url: window.location.origin }),
      });
      if (!res.ok) throw new Error("create");
      const data = await res.json();
      setGenerated(data);
      toast.success("Link di pagamento generato");
      loadPayments(pin);
    } catch (err) {
      toast.error("Errore nella generazione del link");
    }
    setCreating(false);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generated.checkout_url);
    toast.success("Link copiato");
  };

  const shareWhatsApp = () => {
    const text = `FIRST MILANO — Private Chauffeur Service\nGentile ${form.client_name || "cliente"}, ecco il link per completare il pagamento con carta in sicurezza:\n${generated.checkout_url}\nImporto: € ${parseFloat(String(form.amount).replace(",", ".")).toFixed(2)}${form.reference ? `\nRiferimento: ${form.reference}` : ""}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center px-4 py-12">
      <div className="text-center mb-10">
        <p className="font-serif text-2xl tracking-[0.18em] text-ivory">FIRST MILANO</p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold mt-1">Private Chauffeur Service</p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-dim mt-4">Area riservata — Pagamenti</p>
      </div>

      {!unlocked ? (
        <form data-testid="pin-form" onSubmit={unlock} className="w-full max-w-sm border border-white/10 bg-anthracite p-8">
          <label htmlFor="pin" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">
            <Lock size={13} className="text-gold" /> PIN operatore
          </label>
          <input
            id="pin"
            data-testid="pin-input"
            type="password"
            required
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`${inputCls} mt-3`}
            placeholder="Inserisci il PIN"
          />
          <button
            data-testid="pin-submit"
            type="submit"
            disabled={checking}
            className="mt-5 w-full py-3.5 bg-gold text-obsidian text-xs font-semibold tracking-[0.25em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            Accedi
          </button>
        </form>
      ) : (
        <div className="w-full max-w-lg space-y-8">
          <form data-testid="payment-link-form" onSubmit={createLink} className="border border-gold/25 bg-anthracite p-6 sm:p-8 space-y-5">
            <h1 className="font-serif text-2xl text-ivory flex items-center gap-3">
              <CreditCard size={20} className="text-gold" /> Nuovo link di pagamento
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="amount" className="text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">Importo (€)</label>
                <input id="amount" data-testid="amount-input" required inputMode="decimal" placeholder="es. 150.00" className={`${inputCls} mt-2`} value={form.amount} onChange={set("amount")} />
              </div>
              <div>
                <label htmlFor="client_name" className="text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">Nome cliente</label>
                <input id="client_name" data-testid="client-input" placeholder="es. Marco Rossi" className={`${inputCls} mt-2`} value={form.client_name} onChange={set("client_name")} />
              </div>
            </div>
            <div>
              <label htmlFor="reference" className="text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">Riferimento preventivo</label>
              <input id="reference" data-testid="reference-input" placeholder="es. Transfer MXP 12/09 — Rossi" className={`${inputCls} mt-2`} value={form.reference} onChange={set("reference")} />
            </div>
            <div>
              <label htmlFor="description" className="text-[11px] uppercase tracking-[0.2em] text-sub font-semibold">Descrizione sul pagamento</label>
              <input id="description" data-testid="description-input" className={`${inputCls} mt-2`} value={form.description} onChange={set("description")} />
            </div>
            <button
              data-testid="generate-link-button"
              type="submit"
              disabled={creating}
              className="w-full py-4 bg-gold text-obsidian text-xs font-semibold tracking-[0.25em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {creating ? "Generazione…" : "Genera link di pagamento"}
            </button>
          </form>

          {generated && (
            <div data-testid="generated-link-box" className="border border-[#25D366]/40 bg-anthracite p-6">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#25D366] font-semibold">Link pronto da inviare al cliente</p>
              <p data-testid="generated-link" className="mt-3 text-xs text-sub break-all bg-obsidian border border-white/10 p-3">{generated.checkout_url}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button data-testid="copy-link-button" onClick={copyLink} className="inline-flex items-center justify-center gap-2 py-3 border border-gold/50 text-gold-light text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold/10 transition-colors">
                  <Copy size={14} /> Copia link
                </button>
                <button data-testid="share-whatsapp-button" onClick={shareWhatsApp} className="inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] text-obsidian text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#20BA5A] transition-colors">
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </div>
            </div>
          )}

          <div className="border border-white/10 bg-anthracite p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] uppercase tracking-[0.25em] text-sub font-semibold">Pagamenti recenti</h2>
              <button data-testid="refresh-payments" onClick={() => loadPayments(pin)} aria-label="Aggiorna" className="text-dim hover:text-gold transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
            <ul className="mt-4 divide-y divide-white/5">
              {payments.length === 0 && <li className="py-4 text-sm text-dim">Nessun pagamento ancora.</li>}
              {payments.map((p) => {
                const st = STATUS_LABELS[p.payment_status] || STATUS_LABELS.pending;
                return (
                  <li key={p.session_id} data-testid={`payment-row-${p.session_id.slice(-6)}`} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm text-ivory truncate">{p.reference || p.description}</p>
                      <p className="text-[11px] text-dim">{p.client_name || "—"} · {new Date(p.created_at).toLocaleDateString("it-IT")}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-ivory font-semibold">€ {p.amount.toFixed(2)}</p>
                      <span className={`inline-block mt-1 text-[10px] uppercase tracking-[0.15em] border px-2 py-0.5 ${st.cls}`}>{st.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
