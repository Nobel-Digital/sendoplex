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

interface DefaultPlatform {
  name: string;
  iconLabel: string;
  url: string;
}

const DEFAULT_PLATFORMS: DefaultPlatform[] = [
  {
    name: "VOKPARTS.EU",
    iconLabel: "VP",
    url: "https://www.vokparts.eu/?lang=et&call=advancedSearch&options=/data:classic%3D1%26company%255B%255D%3D45%26reserved%3D1%26recom%3D1",
  },
  {
    name: "RRR-OVAKO",
    iconLabel: "RR",
    url: "https://rrr.lt/en/search?sh=2971",
  },
  {
    name: "eBay.de",
    iconLabel: "eB",
    url: "https://www.ebay.de",
  },
];

/** Parses _word_ italic and | line-break — same conventions as Banner parseHeadline */
function parseItalic(text: string): React.ReactNode {
  return text.split("|").map((line, lineIdx, lines) => (
    <React.Fragment key={lineIdx}>
      {line.split(/(_[^_]+_)/g).map((part, i) =>
        part.startsWith("_") && part.endsWith("_") ? (
          <em
            key={i}
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="italic text-white"
          >
            {part.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      {lineIdx < lines.length - 1 && <br />}
    </React.Fragment>
  ));
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

const Parts: React.FC<PartsProps> = ({
  c_partsSectionTitle,
  c_partsSectionDescription,
  c_partnerPlatforms,
  c_partsContactEmail,
  mainPhone,
  locale = "et",
}) => {
  const tr = t(locale);
  const hasCmsPlatforms = Array.isArray(c_partnerPlatforms) && c_partnerPlatforms.length > 0;

  // Section title: supports _word_ italic serif convention (e.g. "Otsid _varuosi?_ Aitame leida.")
  const titleNode = c_partsSectionTitle ? parseItalic(c_partsSectionTitle) : null;

  return (
    <section className="bg-brand text-white" id="varuosad">
      <div className="container mx-auto max-w-screen-xl px-6 py-20">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 mb-12">
          <div className="flex-1">
            {/* Eyebrow: always "VARUOSAD · SOOVITAME" — distinct from the platforms sub-label */}
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 opacity-80">
              VARUOSAD · SOOVITAME
            </span>
            {titleNode && (
              <h2 className="text-section-title font-bold text-white leading-tight">
                {titleNode}
              </h2>
            )}
          </div>
          {c_partsSectionDescription && (
            <p className="mt-6 md:mt-2 md:w-96 text-white/65 text-sm leading-relaxed">
              {c_partsSectionDescription}
            </p>
          )}
        </div>

        {/* Sub-label row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
            {tr.partsRecommended}
          </span>
          <span className="text-xs text-white/30 hidden sm:block">{tr.partsNoSponsors}</span>
        </div>

        {/* Platform cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {hasCmsPlatforms
            ? c_partnerPlatforms!.map((p, i) => (
                <a
                  key={i}
                  href={p.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-sm font-bold text-foreground shrink-0">
                        {p.iconLabel}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-base">{p.name}</p>
                        {p.description && (
                          <p className="text-xs text-white/55 mt-0.5 leading-snug max-w-xs">{p.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-white/40 group-hover:text-primary transition-colors shrink-0 mt-1">
                      <ArrowIcon />
                    </div>
                  </div>
                  {Array.isArray(p.tags) && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.tags.map((tag, j) => (
                        <span key={j} className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium text-white/55 border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))
            : DEFAULT_PLATFORMS.map((p, i) => (
                <a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/25 hover:bg-white/10"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-sm font-bold text-foreground shrink-0">
                      {p.iconLabel}
                    </div>
                    <p className="font-semibold text-white text-base truncate">{p.name}</p>
                  </div>
                  <div className="text-white/40 group-hover:text-primary transition-colors shrink-0">
                    <ArrowIcon />
                  </div>
                </a>
              ))}
        </div>

        {/* Not-found CTA */}
        <div
          id="parts-help"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-primary/30 bg-white/5 p-8"
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
                className="inline-flex items-center gap-2 rounded-full bg-primary text-brand px-5 py-2.5 text-sm font-bold transition-all hover:bg-primary-hover"
              >
                <PhoneIcon />
                {mainPhone}
              </a>
            )}
            {c_partsContactEmail && (
              <a
                href={`mailto:${c_partsContactEmail}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-semibold transition-all hover:border-white/60 hover:bg-white/10"
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
