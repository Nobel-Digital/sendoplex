import * as React from "react";
import { useState } from "react";
import CookieConsent from "./CookieConsent";
import Modal from "./Modal";
import { t } from "../i18n";

export interface FooterProps {
  _site?: any;
  logo?: string;
  c_privacyPolicy: any;
  c_termsContent?: any;
  c_cookiesContent?: any;
  locale?: string;
  name?: string;
  mainPhone?: string;
  emails?: string;
  address?: { line1?: string; city?: string; postalCode?: string };
  hours?: { monday?: any; friday?: any; saturday?: any };
  c_registrationCode?: string;
  c_vatNumber?: string;
  c_availableLocales?: string[];
  facebookPageUrl?: string;
  instagramHandle?: string;
}

const currentYear = new Date().getFullYear();

const LOCALE_LABELS: Record<string, string> = {
  et: "Eesti",
  en: "English",
  fi: "Suomi",
  ru: "Русский",
};

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Footer = ({
  c_privacyPolicy,
  c_termsContent,
  c_cookiesContent,
  locale = "et",
  name,
  mainPhone,
  emails,
  address,
  c_registrationCode,
  c_vatNumber,
  c_availableLocales,
  facebookPageUrl,
  instagramHandle,
}: FooterProps) => {
  const tr = t(locale);
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [isTermsOpen,    setIsTermsOpen]    = useState(false);
  const [isCookiesOpen,  setIsCookiesOpen]  = useState(false);

  const currentCode = locale.split("-")[0].toLowerCase();
  const availableLocales = c_availableLocales ?? [];

  const navLinks = tr.navItems;

  const addressLine = [address?.line1, address?.city, address?.postalCode].filter(Boolean).join(", ");

  return (
    <footer className="bg-brand text-white border-t border-white/10">
      <div className="container mx-auto max-w-screen-xl px-6 py-14">
        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-full bg-white/12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white" aria-hidden="true">
                  <path d="M4 9l1.5-4h9L16 9M4 9H3a1 1 0 00-1 1v2h1m1-3h12m0 0h1a1 1 0 011 1v2h-1m-1-3l.5 3M4 12l-.5 3m0 0h1m11 0h1M6.5 15a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-lg font-bold tracking-tight text-white">sendoplex</p>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-[26ch]">
              Auto kokkuost Eestis ja Soomes. Aus hindamine, kiire vormistus, raha samal päeval.
            </p>
            {(facebookPageUrl || instagramHandle) && (
              <div className="flex gap-3 mt-5">
                {facebookPageUrl && (
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/40 hover:text-primary transition-colors text-xs font-semibold"
                  >
                    FB
                  </a>
                )}
                {instagramHandle && (
                  <a
                    href={`https://instagram.com/${instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/40 hover:text-primary transition-colors text-xs font-semibold"
                  >
                    IG
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Col 2 — Page nav */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-4">
              {tr.footerNavTitle}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-4">
              {tr.footerContactTitle}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              {mainPhone && (
                <li>
                  <a href={`tel:${mainPhone}`} className="hover:text-white transition-colors">
                    {mainPhone}
                  </a>
                </li>
              )}
              {emails && (
                <li>
                  <a href={`mailto:${emails}`} className="hover:text-white transition-colors">
                    {emails}
                  </a>
                </li>
              )}
              {addressLine && <li>{addressLine}</li>}
              {(c_registrationCode || c_vatNumber) && (
                <li className="text-xs text-white/35 mt-1">
                  {name && <span>{name}</span>}
                  {c_registrationCode && <><br />Reg. {c_registrationCode}</>}
                  {c_vatNumber && <><br />KMKR {c_vatNumber}</>}
                </li>
              )}
            </ul>
          </div>

          {/* Col 4 — Language */}
          {availableLocales.length > 0 && (
            <div>
              <h4 className="text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-4">
                {tr.footerLangTitle}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {/* Current locale — active */}
                <li>
                  <span className="text-sm font-semibold text-white">
                    {LOCALE_LABELS[currentCode] ?? currentCode.toUpperCase()}
                  </span>
                </li>
                {/* Other locales */}
                {availableLocales
                  .filter((code) => code.split("-")[0].toLowerCase() !== currentCode)
                  .map((code) => {
                    const short = code.split("-")[0].toLowerCase();
                    const href = short === "et" ? "/" : `/${short}`;
                    return (
                      <li key={code}>
                        <a
                          href={href}
                          className="text-sm text-white/50 hover:text-white transition-colors"
                        >
                          {LOCALE_LABELS[short] ?? short.toUpperCase()}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© {currentYear} {name ?? "Sendoplex OÜ"} · {tr.footerCopyright}</span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {tr.footerPrivacy}
            </button>
            {c_termsContent && (
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {tr.footerTerms}
              </button>
            )}
            {c_cookiesContent && (
              <button
                type="button"
                onClick={() => setIsCookiesOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {tr.footerCookies}
              </button>
            )}
          </div>
        </div>
      </div>

      <CookieConsent
        isModalOpen={isModalOpen}
        handleOpenModal={() => setIsModalOpen(true)}
        handleCloseModal={() => setIsModalOpen(false)}
        c_privacyPolicy={c_privacyPolicy}
        locale={locale}
      />
      <Modal show={isTermsOpen}   onClose={() => setIsTermsOpen(false)}   c_privacyPolicy={c_termsContent}   locale={locale} />
      <Modal show={isCookiesOpen} onClose={() => setIsCookiesOpen(false)} c_privacyPolicy={c_cookiesContent} locale={locale} />
    </footer>
  );
};

export default Footer;
