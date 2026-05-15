import * as React from "react";
import { t } from "../i18n";

export interface PartnerPlatform {
  name: string;
  iconLabel: string;
  description?: string;
  url?: string;
  tags?: string[];
}

export interface PartsProps {
  c_partsSectionTitle?: string;
  c_partsSectionDescription?: string;
  c_partnerPlatforms?: PartnerPlatform[];
  c_partsContactEmail?: string;
  mainPhone?: string;
  locale?: string;
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 8v4M11 14v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PART_CATEGORIES = [
  {
    name: { et: "Mootor", en: "Engine", fi: "Moottori", ru: "Двигатель" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M4 11h2V9h3V7h6v2h3v2h2v4h-2v2h-3v2H9v-2H6v-2H4v-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 11h2v2h-2z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: { et: "Pidurid", en: "Brakes", fi: "Jarrut", ru: "Тормоза" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: { et: "Vedrustus", en: "Suspension", fi: "Jousitus", ru: "Подвеска" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M12 3v18M9 6l3-3 3 3M9 18l3 3 3-3M12 7c-2 1-2 3 0 4s2 3 0 4 0 3 0 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: { et: "Elektrisüsteem", en: "Electrics", fi: "Sähköjärjestelmä", ru: "Электрика" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M13 3L5 14h5l-1 7 8-11h-5l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: { et: "Kere ja tuled", en: "Body & Lights", fi: "Kori ja valot", ru: "Кузов и фары" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 14h18M5 14l2-6c.4-1.2 1.5-2 2.8-2h4.4c1.3 0 2.4.8 2.8 2l2 6M7 14v3M17 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: { et: "Rehvid ja veljed", en: "Tyres & Rims", fi: "Renkaat ja vanteet", ru: "Шины и диски" },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function getCatName(cat: typeof PART_CATEGORIES[0], locale: string): string {
  if (locale.startsWith("en")) return cat.name.en;
  if (locale.startsWith("fi")) return cat.name.fi;
  if (locale.startsWith("ru")) return cat.name.ru;
  return cat.name.et;
}

const Parts: React.FC<PartsProps> = ({
  c_partsSectionTitle,
  c_partsSectionDescription,
  c_partnerPlatforms,
  c_partsContactEmail,
  mainPhone,
  locale = "et",
}) => {
  const tr = t(locale);
  const platforms = c_partnerPlatforms ?? [];

  return (
    <section className="bg-brand text-white" id="varuosad">
      <div className="container mx-auto max-w-screen-xl px-6 py-20">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 mb-12">
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 opacity-80">
              Varuosad · Soovitame
            </span>
            {c_partsSectionTitle && (
              <h2 className="text-section-title font-bold text-white leading-tight">
                {c_partsSectionTitle}
              </h2>
            )}
          </div>
          {c_partsSectionDescription && (
            <p className="mt-6 md:mt-2 md:w-96 text-white/65 text-sm leading-relaxed">
              {c_partsSectionDescription}
            </p>
          )}
        </div>

        {/* Part categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
          {PART_CATEGORIES.map((cat, i) => (
            <a
              key={i}
              href="#parts-help"
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center transition-all hover:border-primary/50 hover:bg-white/10"
            >
              <div className="text-white/80">{cat.icon}</div>
              <span className="text-xs font-medium text-white/75 leading-snug">
                {getCatName(cat, locale)}
              </span>
            </a>
          ))}
        </div>

        {/* Partner platforms */}
        {platforms.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
                {tr.partsRecommended}
              </span>
              <span className="text-xs text-white/30 hidden sm:block">{tr.partsNoSponsors}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
              {platforms.map((p, i) => (
                <a
                  key={i}
                  href={p.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-sm font-bold text-white shrink-0">
                        {p.iconLabel}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{p.name}</p>
                        {p.description && (
                          <p className="text-xs text-white/55 mt-0.5 leading-snug">{p.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-white/40 group-hover:text-primary transition-colors shrink-0 mt-0.5">
                      <ArrowIcon />
                    </div>
                  </div>
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium text-white/55 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </>
        )}

        {/* Not found CTA */}
        <div
          id="parts-help"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-white/12 bg-white/5 p-8"
        >
          <div className="flex items-start gap-5">
            <div className="shrink-0 text-primary mt-0.5">
              <SearchIcon />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{tr.partsNotFoundTitle}</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xl">{tr.partsNotFoundBody}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            {mainPhone && (
              <a
                href={`tel:${mainPhone}`}
                className="inline-flex items-center gap-2 rounded-md bg-primary text-brand px-5 py-2.5 text-sm font-bold transition-all hover:bg-primary-hover"
              >
                <PhoneIcon />
                {mainPhone}
              </a>
            )}
            {c_partsContactEmail && (
              <a
                href={`mailto:${c_partsContactEmail}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 text-white px-5 py-2.5 text-sm font-semibold transition-all hover:border-white/60 hover:bg-white/10"
              >
                {tr.partsWriteUs}
                <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Parts;
