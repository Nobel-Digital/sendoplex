import * as React from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=80&auto=format&fit=crop";

const DEFAULT_TRUST: Array<{ label: string; value: string }> = [
  { label: "PAKKUMINE",      value: "1h jooksul" },
  { label: "TASUMINE",       value: "Sularahas või kontole" },
  { label: "VORMISTUS",      value: "Tasuta, samal päeval" },
  { label: "SÕIDAME JÄRELE", value: "Kogu Eesti, Soome" },
];

export interface BannerProps {
  c_heroImage?: any;
  c_heroSlogan?: string;
  c_heroDescription?: string;
  c_heroButton?: { label?: string; link?: string };
  mainPhone?: string;
  c_heroStatKicker?: string;
  c_heroStatNumber?: string;
  c_heroStatLabel?: string;
  c_trustItemLabels?: string[];
  c_trustItemValues?: string[];
}

// Parses _word_ → Instrument Serif italic span
function parseItalic(text: string): React.ReactNode {
  const parts = text.split(/(_[^_]+_)/g);
  return parts.map((part, i) =>
    part.startsWith("_") && part.endsWith("_") ? (
      <em key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif" }} className="not-italic italic text-white/92">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  );
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M2 3.5A1.5 1.5 0 013.5 2h1.172a1 1 0 01.957.713l.643 2.572a1 1 0 01-.293 1l-.9.9a8.02 8.02 0 003.736 3.736l.9-.9a1 1 0 011-.293l2.572.643A1 1 0 0114 11.328V12.5A1.5 1.5 0 0112.5 14C6.701 14 2 9.299 2 3.5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Banner: React.FC<BannerProps> = ({
  c_heroImage,
  c_heroSlogan,
  c_heroDescription,
  c_heroButton,
  mainPhone,
  c_heroStatKicker,
  c_heroStatNumber,
  c_heroStatLabel,
  c_trustItemLabels,
  c_trustItemValues,
}) => {
  const imageUrl = c_heroImage?.image?.url ?? FALLBACK_IMAGE;

  const trustItems =
    Array.isArray(c_trustItemLabels) && c_trustItemLabels.length > 0
      ? c_trustItemLabels.map((label, i) => ({ label, value: c_trustItemValues?.[i] ?? "" }))
      : DEFAULT_TRUST;

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden bg-brand"
      style={{ minHeight: "100svh" }}
      id="top"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(20,24,26,0.28) 0%, rgba(20,24,26,0.08) 38%, rgba(20,24,26,0.62) 88%)",
            "linear-gradient(to right, rgba(20,24,26,0.80) 0%, transparent 62%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Main content — grows to fill hero */}
      <div className="relative z-10 flex-1 container mx-auto max-w-screen-xl px-6 pt-32 pb-10 flex flex-col justify-end">
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16">

          {/* Left — copy */}
          <div className="flex-1 min-w-0">
            {c_heroSlogan && (
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/68">
                  {c_heroSlogan}
                </span>
              </div>
            )}

            {c_heroDescription && (
              <h1
                className="font-bold text-white leading-[0.93]"
                style={{ fontSize: "clamp(52px, 8vw, 110px)" }}
              >
                {parseItalic(c_heroDescription)}
              </h1>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              {c_heroButton?.link && (
                <a
                  href={c_heroButton.link}
                  className="inline-flex items-center gap-2.5 rounded-full bg-primary text-brand px-6 py-3.5 text-sm font-bold transition-all hover:bg-primary-hover hover:shadow-lg"
                >
                  {c_heroButton.label ?? "Paku oma autot"}
                  <ArrowIcon />
                </a>
              )}
              {mainPhone && (
                <a
                  href={`tel:${mainPhone}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/8 backdrop-blur-sm text-white px-6 py-3.5 text-sm font-semibold transition-all hover:border-white/65 hover:bg-white/14"
                >
                  <PhoneIcon />
                  {mainPhone}
                </a>
              )}
            </div>
          </div>

          {/* Right — stat block */}
          {(c_heroStatNumber || c_heroStatLabel) && (
            <div className="mt-12 lg:mt-0 lg:shrink-0 lg:text-right">
              {c_heroStatKicker && (
                <p
                  className="italic text-white/65 mb-1"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(15px, 1.4vw, 20px)" }}
                >
                  {c_heroStatKicker}
                </p>
              )}
              {c_heroStatNumber && (
                <p
                  className="font-bold text-white leading-none"
                  style={{ fontSize: "clamp(56px, 6.5vw, 88px)" }}
                >
                  {c_heroStatNumber}
                </p>
              )}
              {c_heroStatLabel && (
                <p className="mt-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-white/48">
                  {c_heroStatLabel}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 border-t border-white/14 grid grid-cols-2 md:grid-cols-4">
        {trustItems.map((item, i) => (
          <div
            key={i}
            className={`py-5 px-6 ${
              i < trustItems.length - 1
                ? i === 1
                  ? "border-r-0 md:border-r border-white/10"
                  : "border-r border-white/10"
                : ""
            }`}
          >
            <p className="text-[10px] font-semibold tracking-[0.13em] uppercase text-white/36 mb-1.5">
              {String(i + 1).padStart(2, "0")} — {item.label}
            </p>
            <p className="text-sm font-medium text-white/85">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center py-3.5 border-t border-white/8" aria-hidden="true">
        <div className="flex items-center gap-2 text-white/28">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase">Keri alla</span>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 animate-bounce">
            <path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Banner;
