import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { CONTACTS } from "@/config";

export default function Contacts() {
  const { t } = useLanguage();
  const c = t.contacts;

  const cards = [
    {
      id: "phone", icon: Phone, label: c.phone, value: CONTACTS.phoneDisplay,
      href: CONTACTS.phoneRaw ? `tel:${CONTACTS.phoneRaw}` : null,
    },
    {
      id: "whatsapp", icon: MessageCircle, label: c.whatsapp, value: CONTACTS.whatsappDisplay,
      href: `https://wa.me/${CONTACTS.whatsappNumber}`,
    },
    {
      id: "email", icon: Mail, label: c.email, value: CONTACTS.email,
      href: CONTACTS.email.includes("@") ? `mailto:${CONTACTS.email}` : null,
    },
    { id: "address", icon: MapPin, label: c.address, value: CONTACTS.address, href: null },
  ];

  return (
    <section id="contatti" data-testid="contacts-section" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory max-w-2xl leading-tight">{c.title}</h2>
          <p className="mt-4 text-sm text-dim">{c.note}</p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <>
                <Icon size={22} strokeWidth={1.25} className="text-gold" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-sub font-semibold">{card.label}</p>
                <p className="mt-2 text-sm text-ivory">{card.value}</p>
              </>
            );
            const cls = "block bg-obsidian p-8 text-center transition-colors duration-500 hover:bg-anthracite h-full";
            return (
              <Reveal key={card.id} delay={i * 0.08}>
                {card.href ? (
                  <a data-testid={`contact-card-${card.id}`} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div data-testid={`contact-card-${card.id}`} className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
