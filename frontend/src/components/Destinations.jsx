import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Reveal } from "@/components/Reveal";

const ROUTES = [
  { key: "como", path: "/milano-lago-di-como" },
  { key: "stmoritz", path: "/milano-st-moritz" },
  { key: "portofino", path: "/milano-portofino" },
  { key: "venezia", path: "/milano-venezia" },
  { key: "firenze", path: "/milano-firenze" },
  { key: "roma", path: "/milano-roma" },
];

export default function Destinations() {
  const { t } = useLanguage();

  return (
    <section data-testid="destinations-section" className="bg-cream py-20 lg:py-28 border-y border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-golddeep font-semibold">
            {t.destinations.eyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-ink">
            {t.destinations.title}
          </h2>
          <span className="mt-6 h-px w-16 bg-golddeep/60" />
          <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-[#6B6659]">
            {t.destinations.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROUTES.map((route, i) => (
            <Reveal key={route.path} delay={(i % 3) * 0.06}>
              <a
                href={route.path}
                data-testid={`destination-${route.key}`}
                className="group flex h-full items-center justify-between gap-5 rounded-2xl border border-ink/10 bg-white/55 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-golddeep/30 hover:bg-white hover:shadow-lg hover:shadow-black/5"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-golddeep/8 text-golddeep">
                    <MapPin size={18} strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-ink">{t.destinations.items[route.key]}</span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-[#817A69]">
                      {t.destinations.cta}
                    </span>
                  </span>
                </span>
                <ArrowUpRight size={17} className="shrink-0 text-golddeep transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
