import * as React from "react";

export interface TrustItem {
  label: string;
  value: string;
}

export interface BannerProps {
  c_heroImage?: any;
  c_heroSlogan?: string;
  c_heroDescription?: string;
  c_heroButton?: { label?: string; link?: string };
  c_heroSecondaryButton?: { label?: string; link?: string };
  c_heroStatKicker?: string;
  c_heroStatNumber?: string;
  c_heroStatLabel?: string;
  c_heroTrustItems?: TrustItem[];
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M8 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Banner: React.FC<BannerProps> = ({
  c_heroImage,
  c_heroSlogan,
  c_heroDescription,
  c_heroButton,
  c_heroSecondaryButton,
  c_heroStatKicker,
  c_heroStatNumber,
  c_heroStatLabel,
  c_heroTrustItems,
}) => {
  const hasTrust = Array.isArray(c_heroTrustItems) && c_heroTrustItems.length > 0;
  const hasStat  = c_heroStatNumber || c_heroStatLabel;

  return (
    <section className="relative w-full bg-brand overflow-hidden" id="top">
      {/* Background image */}
      {c_heroImage?.image?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${c_heroImage.image.url})` }}
          aria-hidden="true"
        />
      )}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(28,43,30,0.92) 0%, rgba(42,63,45,0.75) 55%, rgba(28,43,30,0.50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-screen-xl px-6 pt-36 pb-0">
        {/* Main grid: copy left, stat right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 min-w-0">
            {c_heroSlogan && (
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-5 opacity-90">
                {c_heroSlogan}
              </span>
            )}
            {c_heroDescription && (
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight">
                {c_heroDescription}
              </h1>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              {c_heroButton?.link && (
                <a
                  href={c_heroButton.link}
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-brand px-6 py-3.5 text-sm font-bold transition-all hover:bg-primary-hover hover:shadow-lg"
                >
                  {c_heroButton.label ?? "Paku oma autot"}
                  <ArrowIcon />
                </a>
              )}
              {c_heroSecondaryButton?.link && (
                <a
                  href={c_heroSecondaryButton.link}
                  className="inline-flex items-center gap-2 rounded-md border border-white/40 text-white px-6 py-3.5 text-sm font-semibold transition-all hover:border-white/80 hover:bg-white/10"
                >
                  {c_heroSecondaryButton.label ?? "Otsi varuosa"}
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>

          {/* Right — stat block */}
          {hasStat && (
            <div className="mt-14 lg:mt-0 lg:shrink-0 lg:w-52">
              {c_heroStatKicker && (
                <p className="text-xs font-semibold tracking-widest uppercase text-white/45 mb-2">
                  {c_heroStatKicker}
                </p>
              )}
              {c_heroStatNumber && (
                <p className="text-7xl font-bold text-white font-serif leading-none">
                  {c_heroStatNumber}
                </p>
              )}
              {c_heroStatLabel && (
                <p className="mt-2 text-sm text-white/60 leading-snug">{c_heroStatLabel}</p>
              )}
            </div>
          )}
        </div>

        {/* Trust strip */}
        {hasTrust && (
          <div className="mt-14 border-t border-white/15 grid grid-cols-2 md:grid-cols-4">
            {c_heroTrustItems!.map((item, i) => (
              <div
                key={i}
                className="py-6 pr-6 border-r border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40 mb-1">
                  {String(i + 1).padStart(2, "0")} — {item.label}
                </p>
                <p className="text-sm font-medium text-white/90">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="flex items-center gap-1.5 py-5 text-white/30 text-xs font-medium" aria-hidden="true">
          <span>Keri alla</span>
          <ArrowDownIcon />
        </div>
      </div>
    </section>
  );
};

export default Banner;
