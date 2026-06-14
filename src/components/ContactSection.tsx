import * as React from "react";
import { t } from "../i18n";

export interface ContactSectionProps {
  c_contactEyebrow?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    localizedCountryName?: string;
  };
  phone?: string;
  mobilePhone?: string;
  instagramHandle?: string;
  facebookPageUrl?: string;
  emails?: string;
  c_registrationCode?: string;
  c_vatNumber?: string;
  c_contactSectionTitle1?: string;
  c_contactSectionTitle2?: string;
  c_contactSectionTitle3?: string;
  c_heroButton?: { label?: string; link?: string };
  name?: string;
  c_privacyPolicy?: any;
  c_mapIframe?: any;
  hours?: Record<string, { openIntervals?: { start: string; end: string }[]; isClosed?: boolean }>;
  locale?: string;
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MapPlaceholder = () => (
  <svg viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" className="w-full h-full block" aria-hidden="true">
    <defs>
      <linearGradient id="mapbg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#eee7d3"/>
        <stop offset="1" stopColor="#dccfa7"/>
      </linearGradient>
    </defs>
    <rect width="800" height="480" fill="url(#mapbg)"/>
    <path d="M0 0 L 800 0 L 800 90 Q 600 130, 400 100 Q 200 70, 0 120 Z" fill="#bcd4d6" opacity="0.7"/>
    <path d="M0 480 L 800 480 L 800 420 Q 600 380, 380 410 Q 180 440, 0 380 Z" fill="#bcd4d6" opacity="0.5"/>
    <circle cx="200" cy="280" r="60" fill="#c8d6b6"/>
    <circle cx="640" cy="180" r="80" fill="#c8d6b6"/>
    <circle cx="540" cy="380" r="45" fill="#c8d6b6"/>
    <g stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round">
      <path d="M-20 250 Q 200 220, 400 240 T 820 230"/>
      <path d="M-20 320 Q 240 360, 480 320 T 820 340"/>
      <path d="M120 -20 Q 140 200, 180 480"/>
      <path d="M380 -20 Q 410 200, 400 480"/>
      <path d="M620 -20 Q 600 220, 640 480"/>
    </g>
    <g stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7">
      <path d="M-20 180 Q 240 160, 500 190 T 820 180"/>
      <path d="M-20 400 Q 240 420, 500 400 T 820 420"/>
      <path d="M260 -20 Q 280 240, 300 480"/>
      <path d="M500 -20 Q 520 240, 540 480"/>
    </g>
    <g fill="rgba(255,255,255,0.4)">
      <rect x="60" y="70" width="50" height="40" rx="3"/>
      <rect x="140" y="70" width="60" height="40" rx="3"/>
      <rect x="290" y="120" width="60" height="40" rx="3"/>
      <rect x="430" y="160" width="50" height="50" rx="3"/>
      <rect x="60" y="370" width="40" height="60" rx="3"/>
    </g>
  </svg>
);

const ContactSection = ({
  c_contactEyebrow,
  address,
  phone,
  emails,
  mobilePhone,
  c_registrationCode,
  c_vatNumber,
  c_contactSectionTitle1,
  c_contactSectionTitle2,
  c_contactSectionTitle3,
  name,
  instagramHandle,
  facebookPageUrl,
  c_mapIframe,
  hours,
  locale = "et",
}: ContactSectionProps) => {
  const tr = t(locale);
  const contactPhone = phone || mobilePhone;

  // c_mapIframe is a plain MULTILINE string — accept either:
  //   a) a full Google Maps embed URL  (https://www.google.com/maps/embed?pb=…)
  //   b) a raw <iframe …> snippet — src attribute is extracted via regex
  const iframeSrc = (() => {
    const raw: string = typeof c_mapIframe === "string" ? c_mapIframe.trim() : "";
    if (!raw) return null;
    // If the user pasted a bare URL
    if (raw.startsWith("https://")) {
      try { new URL(raw); return raw; } catch { return null; }
    }
    // If the user pasted the full <iframe …> embed HTML
    const match = raw.match(/src=["']([^"']+)["']/i);
    if (match) {
      try {
        const url = new URL(match[1]);
        return url.protocol === "https:" ? url.href : null;
      } catch { return null; }
    }
    return null;
  })();

  const addressLine = address
    ? [address.line1, address.line2, address.city, address.postalCode].filter(Boolean).join(", ")
    : null;

  // Build readable hours string
  const hoursRows: { label: string; value: string }[] = [];
  if (hours) {
    const wk = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const wkOpen = wk.map((d) => hours[d]?.openIntervals?.[0]);
    if (wkOpen.every((h) => h && h.start === wkOpen[0]!.start && h.end === wkOpen[0]!.end)) {
      hoursRows.push({ label: tr.contactWeekdays, value: `${wkOpen[0]!.start}–${wkOpen[0]!.end}` });
    }
    const sat = hours.saturday;
    if (sat?.isClosed) hoursRows.push({ label: tr.contactSaturday, value: tr.contactClosed });
    else if (sat?.openIntervals?.[0]) hoursRows.push({ label: tr.contactSaturday, value: `${sat.openIntervals[0].start}–${sat.openIntervals[0].end}` });
    const sun = hours.sunday;
    if (sun?.isClosed) hoursRows.push({ label: tr.contactSunday, value: tr.contactClosed });
    else if (sun?.openIntervals?.[0]) hoursRows.push({ label: tr.contactSunday, value: `${sun.openIntervals[0].start}–${sun.openIntervals[0].end}` });
  }

  return (
    <section id="kontakt" className="bg-background py-20 border-b border-divider px-6 md:px-10 scroll-mt-24">
      <div className="container mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 mb-12">
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {c_contactEyebrow ?? "Kontakt ja tugi"}
            </span>
            {c_contactSectionTitle1 && (
              <h2 className="text-section-title font-bold text-foreground leading-tight">
                {c_contactSectionTitle1}
              </h2>
            )}
          </div>
          {c_contactSectionTitle2 && (
            <p className="mt-6 md:mt-2 md:w-80 text-foreground/55 text-sm leading-relaxed">
              {c_contactSectionTitle2}
            </p>
          )}
        </div>

        {/* Card + Map grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact card */}
          <div className="rounded-2xl border border-divider bg-white shadow-sm overflow-hidden flex flex-col">
            {/* Phone CTA — full-width pill dark button */}
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="flex items-center justify-between gap-3 mx-6 mt-6 mb-2 px-6 py-4 rounded-full bg-brand text-white font-bold text-sm tracking-wide transition-all hover:bg-brand-soft group"
              >
                <div className="flex items-center gap-3">
                  <PhoneIcon />
                  <span className="uppercase tracking-widest text-xs font-bold">
                    {tr.contactCallNow}
                  </span>
                </div>
                <ArrowIcon />
              </a>
            )}
            {/* Phone number as secondary row */}
            {contactPhone && (
              <div className="px-8 pb-1 pt-2 border-b border-divider">
                <a href={`tel:${contactPhone}`} className="text-sm font-semibold text-foreground/60 hover:text-brand transition-colors">
                  {contactPhone}
                </a>
              </div>
            )}

            {/* Info rows */}
            <div className="flex flex-col divide-y divide-divider flex-1">
              {emails && (
                <div className="flex items-start justify-between gap-4 px-8 py-5">
                  <span className="text-xs font-semibold text-foreground/40 w-20 shrink-0 pt-0.5">{tr.contactEmail}</span>
                  <div className="flex-1">
                    <a href={`mailto:${emails}`} className="text-sm text-foreground hover:text-brand transition-colors">
                      {emails}
                    </a>
                    <p className="text-[11px] text-foreground/40 mt-0.5">{tr.contactEmailHint}</p>
                  </div>
                </div>
              )}
              {addressLine && (
                <div className="flex items-start justify-between gap-4 px-8 py-5">
                  <span className="text-xs font-semibold text-foreground/40 w-20 shrink-0 pt-0.5">{tr.contactAddress}</span>
                  <div className="flex-1 text-sm text-foreground">{addressLine}</div>
                </div>
              )}
              {hoursRows.length > 0 && (
                <div className="flex items-start gap-4 px-8 py-5">
                  <span className="text-xs font-semibold text-foreground/40 w-20 shrink-0 pt-0.5">{tr.contactHours}</span>
                  <div className="flex flex-col gap-0.5">
                    {hoursRows.map((row, i) => (
                      <p key={i} className="text-sm text-foreground">
                        <span className="text-foreground/50 w-6 inline-block">{row.label}</span> {row.value}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {(name || c_registrationCode || c_vatNumber) && (
                <div className="flex items-start gap-4 px-8 py-5">
                  <span className="text-xs font-semibold text-foreground/40 w-20 shrink-0 pt-0.5">{tr.contactRegNr}</span>
                  <div className="text-sm text-foreground/70 leading-snug">
                    {name && <p className="font-medium text-foreground">{name}</p>}
                    {c_registrationCode && <p>{c_registrationCode}</p>}
                    {c_vatNumber && <p>{tr.contactVat} {c_vatNumber}</p>}
                  </div>
                </div>
              )}
              {(facebookPageUrl || instagramHandle) && (
                <div className="flex items-start gap-4 px-8 py-5">
                  <span className="text-xs font-semibold text-foreground/40 w-20 shrink-0 pt-0.5">{c_contactSectionTitle3 ?? tr.contactSocial}</span>
                  <div className="flex gap-4 text-sm">
                    {facebookPageUrl && (
                      <a href={facebookPageUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-brand transition-colors">Facebook</a>
                    )}
                    {instagramHandle && (
                      <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-brand transition-colors">Instagram</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map card */}
          <div className="rounded-2xl border border-divider overflow-hidden bg-brand-tint min-h-[320px] lg:min-h-0">
            {iframeSrc ? (
              <iframe
                src={iframeSrc}
                className="w-full h-full min-h-[320px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={tr.contactMapTitle}
              />
            ) : (
              <div className="w-full h-full min-h-[320px] relative">
                <MapPlaceholder />
                {addressLine && (
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-medium text-foreground shadow">
                    <span className="w-2 h-2 rounded-full bg-brand shrink-0" aria-hidden="true" />
                    {addressLine}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
