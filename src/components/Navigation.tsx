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
  et: "ET", en: "EN", fi: "FI", ru: "RU",
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

  const currentLocaleCode = locale.split(/[-_]/)[0].toLowerCase();
  const availableLocales: string[] = data.c_availableLocales ?? [];

  // All locales for switcher — current shown as active
  const allLocaleLinks = availableLocales.map((code) => {
    const short = code.split(/[-_]/)[0].toLowerCase();
    return {
      code,
      short,
      label: LOCALE_LABELS[short] ?? short.toUpperCase(),
      href: short === "et" ? "/" : `/${short}`,
      active: short === currentLocaleCode,
    };
  });
  const showSwitcher = allLocaleLinks.length > 1;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenChat = React.useCallback(() => openChat(), []);
  const handleOpenChatFromMobile = React.useCallback(() => {
    setMobileMenuOpen(false);
    setTimeout(() => openChat(), 50);
  }, []);

  // Colour tokens that flip on scroll
  const navText    = scrolled ? "text-foreground"      : "text-white";
  const navSubText = scrolled ? "text-foreground/55"   : "text-white/70";
  const navHover   = scrolled ? "hover:text-foreground" : "hover:text-white";
  const divider    = scrolled ? "border-foreground/15"  : "border-white/20";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ? "bg-white/88 backdrop-blur-xl border-b border-black/8 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 max-w-screen-xl">
        <nav className={`flex justify-between items-center py-4 ${navText}`}>

          {/* Logo */}
          <a href="/" className="shrink-0 flex items-center gap-2.5">
            {/* Car icon circle */}
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                scrolled ? "bg-brand text-white" : "bg-white/12 text-white"
              }`}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M4 9l1.5-4h9L16 9M4 9H3a1 1 0 00-1 1v2h1m1-3h12m0 0h1a1 1 0 011 1v2h-1m-1-3l.5 3M4 12l-.5 3m0 0h1m11 0h1M6.5 15a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {data.logo ? (
              <Image image={data.logo} layout="fixed" height={28} width={100} />
            ) : (
              <span className="text-base font-bold tracking-tight">sendoplex</span>
            )}
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-7">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={`text-sm font-medium transition-colors ${navSubText} ${navHover}`}
              >
                {item.name}
              </Link>
            ))}

            {/* Locale switcher — segmented pill */}
            {showSwitcher && (
              <div className={`flex items-center border-l ${divider} pl-6 ml-1`}>
                <div
                  role="tablist"
                  aria-label="Keel"
                  className={`flex items-center rounded-full px-1 py-1 transition-colors ${
                    scrolled ? "bg-black/6 border border-black/8" : "bg-white/10 border border-white/18"
                  }`}
                >
                  {allLocaleLinks.map(({ code, short, label, href, active }) => (
                    <a
                      key={code}
                      href={href}
                      role="tab"
                      aria-selected={active}
                      aria-label={`Switch language to ${label}`}
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                        active
                          ? scrolled
                            ? "bg-brand text-white shadow-sm"
                            : "bg-white/95 text-brand shadow-sm"
                          : `${navSubText} ${navHover}`
                      }`}
                    >
                      <span className={`flag flag-${short}`} aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA button */}
            {ctaLabel && (
              <div className="ml-1">
                {ctaLink ? (
                  <a
                    href={ctaLink}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                      scrolled
                        ? "bg-primary text-brand hover:bg-primary-hover hover:shadow-md"
                        : "bg-white/12 border border-white/25 text-white hover:bg-white/22 hover:border-white/45"
                    }`}
                  >
                    {ctaLabel}
                    <ArrowIcon />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                      scrolled
                        ? "bg-primary text-brand hover:bg-primary-hover hover:shadow-md"
                        : "bg-white/12 border border-white/25 text-white hover:bg-white/22 hover:border-white/45"
                    }`}
                  >
                    {ctaLabel}
                    <ArrowIcon />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${navSubText} ${navHover}`}
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
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="w-7 h-7 rounded-full bg-white/12 flex items-center justify-center">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-white" aria-hidden="true">
                  <path d="M4 9l1.5-4h9L16 9M4 9H3a1 1 0 00-1 1v2h1m1-3h12m0 0h1a1 1 0 011 1v2h-1m-1-3l.5 3M4 12l-.5 3m0 0h1m11 0h1M6.5 15a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {data.logo ? (
                <Image image={data.logo} layout="fixed" height={28} width={100} />
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
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-brand px-5 py-3 text-base font-bold hover:bg-primary-hover transition-all mb-4"
                >
                  {ctaLabel}
                  <ArrowIcon />
                </a>
              ) : (
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-brand px-5 py-3 text-base font-bold hover:bg-primary-hover transition-all mb-4"
                  onClick={handleOpenChatFromMobile}
                >
                  {ctaLabel}
                  <ArrowIcon />
                </button>
              )
            )}

            {showSwitcher && (
              <div
                role="tablist"
                aria-label="Keel"
                className="flex items-center gap-1 mt-2 rounded-full bg-white/10 border border-white/18 px-1 py-1 w-fit"
              >
                {allLocaleLinks.map(({ code, short, label, href, active }) => (
                  <a
                    key={code}
                    href={href}
                    role="tab"
                    aria-selected={active}
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                      active ? "bg-white/95 text-brand shadow-sm" : "text-white/55 hover:text-white"
                    }`}
                  >
                    <span className={`flag flag-${short}`} aria-hidden="true" />
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
