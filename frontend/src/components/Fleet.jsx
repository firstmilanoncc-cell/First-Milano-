import { useLanguage } from "@/i18n";
import { Reveal, Eyebrow } from "@/components/Reveal";
import { IMAGES } from "@/config";

const FleetCard = ({ data, image, testId, delay }) => (
  <Reveal delay={delay}>
    <article data-testid={testId} className="group border border-white/8 bg-obsidian">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={data.label}
          loading="lazy"
          className="w-full aspect-[16/10] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        <span className="absolute bottom-4 left-6 font-serif italic text-2xl sm:text-3xl text-ivory">{data.label}</span>
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold font-semibold">{data.model}</p>
        <p className="mt-4 text-sm sm:text-base text-sub leading-relaxed">{data.desc}</p>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {data.features.map((f) => (
            <li key={f} className="flex items-center gap-3 text-sm text-ivory/85">
              <span className="h-px w-5 bg-gold shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  </Reveal>
);

export default function Fleet() {
  const { t } = useLanguage();
  return (
    <section id="flotta" data-testid="fleet-section" className="py-20 lg:py-32 bg-anthracite/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center flex flex-col items-center">
          <Eyebrow>{t.fleet.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory">{t.fleet.title}</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FleetCard data={t.fleet.sedan} image={IMAGES.fleetSedan} testId="fleet-card-sedan" delay={0.1} />
          <FleetCard data={t.fleet.van} image={IMAGES.fleetVan} testId="fleet-card-van" delay={0.2} />
        </div>
      </div>
    </section>
  );
}
