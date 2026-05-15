import * as React from "react";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Image, Link } from "@yext/pages-components";
import { openChat } from "./chat/chatEvents";
import { t } from "../i18n";

export interface NavigationProps {
  data: {
    logo: any;
    phone?: string;
    email?: string;
    locale?: string;
    c_navigationButton?: { label?: string; link?: string };
    c_availableLocales?: string[];
  };
}

const LOCALE_LABELS: Record<string, string> = {
  et: "ET",
  en: "EN",
  fi: "FI",
  ru: "RU",
};

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navigation = ({ data }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const locale = data.locale ?? "et";
  const tr = t(locale);
  const navigation = tr.navItems;
  const ctaLabel = data.c_navigationButton?.label;
  const ctaLink  = data.c_navigationButton?.link;

  const currentLocaleCode = locale.split("-")[0].toLowerCase();
  const availableLocales: string[] = data.c_availableLocales ?? [];
  const localeLinks = availableLocales
    .filter((code) => code.toLowerCase() !== currentLocaleCode)
    .map((code) => {
      const short = code.split("-")[0].toLowerCase();
      return {
        code,
        label: LOCALE_LABELS[short] ?? short.toUpperCase(),
        href: short === "et" ? "/" : `/${short}`,
      };
    });
  const showSwitcher = localeLinks.length > 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenChat = React.useCallback(() => openChat(), []);
  const handleOpenChatFromMobile = React.useCallback(() => {
    setMobileMenuOpen(false);
    setTimeout(() => openChat(), 50);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-brand ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="container mx-auto px-6 max-w-screen-xl">
        <nav className="flex justify-between items-center py-4 text-navigation-text">
          {/* Logo */}
          <a href="/" className="shrink-0">
            {data.logo ? (
              <Image image={data.logo} layout="fixed" height={46} width={120} />
            ) : (
              <span className="text-lg font-bold tracking-tight text-white">sendoplex</span>
            )}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Locale switcher */}
            {showSwitcher && (
              <div className="flex items-center gap-1 border-l border-white/20 pl-6 ml-2">
                {localeLinks.map(({ code, label, href }) => (
                  <a
                    key={code}
                    href={href}
                    aria-label={`Switch language to ${label}`}
                    className="text-xs font-semibold text-white/50 hover:text-white transition-colors px-1.5"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}

            {/* CTA button */}
            {ctaLabel && (
              ctaLink ? (
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-brand px-5 py-2.5 text-sm font-bold transition-all hover:bg-primary-hover hover:shadow-md ml-2"
                >
                  {ctaLabel}
                  <ArrowIcon />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenChat}
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-brand px-5 py-2.5 text-sm font-bold transition-all hover:bg-primary-hover hover:shadow-md ml-2"
                >
                  {ctaLabel}
                  <ArrowIcon />
                </button>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={tr.navOpenMenu}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-[110] bg-black/50" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-[120] w-full overflow-y-auto bg-brand px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              {data.logo ? (
                <Image image={data.logo} layout="fixed" height={40} width={100} />
              ) : (
                <span className="text-base font-bold text-white">sendoplex</span>
              )}
            </a>
            <button
              type="button"
              className="text-white/70 hover:text-white inline-flex items-center justify-center rounded-md p-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={tr.navCloseMenu}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/15">
            {ctaLabel && (
              ctaLink ? (
                <a
                  href={ctaLink}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-brand px-5 py-3 text-base font-bold hover:bg-primary-hover transition-all mb-4"
                >
                  {ctaLabel}
                  <ArrowIcon />
                </a>
              ) : (
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary text-brand px-5 py-3 text-base font-bold hover:bg-primary-hover transition-all mb-4"
                  onClick={handleOpenChatFromMobile}
                >
                  {ctaLabel}
                  <ArrowIcon />
                </button>
              )
            )}
            {showSwitcher && (
              <div className="flex justify-start gap-4 mt-2">
                {localeLinks.map(({ code, label, href }) => (
                  <a
                    key={code}
                    href={href}
                    aria-label={`Switch language to ${label}`}
                    className="text-sm font-semibold text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navigation;
