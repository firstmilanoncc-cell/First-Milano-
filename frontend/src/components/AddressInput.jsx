import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const PHOTON_URL = "https://photon.komoot.io/api/";

const displayName = (p) => [p.name, p.street, p.housenumber, p.city].filter(Boolean).join(", ");

export default function AddressInput({ id, testId, placeholder, value, onChange, required = false, className = "" }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const abortRef = useRef(null);
  const wrapRef = useRef(null);
  const chosenRef = useRef("");

  useEffect(() => {
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    const q = value.trim();
    if (q.length < 3 || q === chosenRef.current) {
      setItems([]);
      setOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const params = new URLSearchParams({
        q,
        countrycode: "IT",
        limit: "5",
        lat: "45.4642",
        lon: "9.19",
      });
      try {
        const res = await fetch(`${PHOTON_URL}?${params}`, { signal: controller.signal });
        const data = await res.json();
        setItems(data.features || []);
        setOpen(true);
      } catch (err) {
        // richiesta annullata o rete assente: nessun suggerimento, resta inserimento manuale
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  const choose = (f) => {
    const label = displayName(f.properties);
    chosenRef.current = label;
    onChange(label);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        id={id}
        data-testid={testId}
        required={required}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => items.length > 0 && setOpen(true)}
        className={className}
      />
      {open && items.length > 0 && (
        <ul
          data-testid={`${testId}-suggestions`}
          className="absolute z-50 left-0 right-0 mt-1 border border-gold/25 bg-elevated shadow-2xl shadow-black/60 max-h-56 overflow-y-auto"
        >
          {items.map((f, i) => (
            <li key={`${f.properties.osm_id}-${i}`}>
              <button
                type="button"
                data-testid={`${testId}-suggestion-${i}`}
                onClick={() => choose(f)}
                className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-gold/10 transition-colors duration-200"
              >
                <MapPin size={14} strokeWidth={1.5} className="text-gold mt-1 shrink-0" />
                <span>
                  <span className="block text-sm text-ivory">{displayName(f.properties)}</span>
                  <span className="block text-[11px] text-dim">
                    {[f.properties.state || f.properties.county, f.properties.country].filter(Boolean).join(", ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
