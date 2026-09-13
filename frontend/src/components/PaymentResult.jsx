import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

export default function PaymentResult({ cancelled = false }) {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState(cancelled ? "cancelled" : "loading");

  useEffect(() => {
    if (cancelled || !sessionId) return;
    let attempts = 0;
    const poll = async () => {
      try {
        const res = await fetch(`${API}/api/payments/status/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.payment_status === "paid") {
            setStatus("paid");
            return;
          }
        }
      } catch (err) { /* retry */ }
      attempts += 1;
      if (attempts < 10) setTimeout(poll, 2500);
      else setStatus("pending");
    };
    poll();
  }, [cancelled, sessionId]);

  const content = {
    loading: { icon: <Loader2 size={40} className="text-gold animate-spin" />, title: "Verifica del pagamento…", text: "Stiamo confermando il tuo pagamento con la banca." },
    paid: { icon: <CheckCircle2 size={40} className="text-[#25D366]" />, title: "Pagamento completato", text: "Grazie. Il tuo pagamento è stato ricevuto: FIRST MILANO ti contatterà per confermare i dettagli del servizio." },
    pending: { icon: <Loader2 size={40} className="text-gold animate-spin" />, title: "Pagamento in elaborazione", text: "Il pagamento è in fase di conferma. Riceverai a breve una conferma." },
    cancelled: { icon: <XCircle size={40} className="text-dim" />, title: "Pagamento annullato", text: "Nessun addebito è stato effettuato. Puoi riprovare dal link ricevuto o contattarci su WhatsApp." },
  }[status];

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div data-testid="payment-result" className="max-w-md w-full text-center border border-white/10 bg-anthracite p-10">
        <div className="flex justify-center">{content.icon}</div>
        <p className="font-serif text-xl tracking-[0.18em] text-ivory mt-6">FIRST MILANO</p>
        <h1 data-testid="payment-result-title" className="mt-4 font-serif text-2xl text-ivory">{content.title}</h1>
        <p className="mt-3 text-sm text-sub leading-relaxed">{content.text}</p>
        <a href="/" data-testid="back-home-link" className="inline-block mt-8 px-8 py-3 border border-gold/50 text-gold-light text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors">
          Torna al sito
        </a>
      </div>
    </div>
  );
}
