import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { t } from "../i18n";

interface CookieConsentProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  c_privacyPolicy: any;
  locale?: string;
}

const CookieConsent = ({
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
  c_privacyPolicy,
  locale = "et",
}: CookieConsentProps) => {
  const tr = t(locale);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "true");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-x-0 bottom-0 z-[120] px-4 pb-4 md:px-6 md:pb-6">
          <div className="mx-auto max-w-screen-xl">
            <div className="rounded-lg border border-slate-200 bg-foreground shadow-lg">
              <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:gap-6 md:p-5">
                <div className="flex-1 text-left">
                  <p className="text-sm leading-6 text-background">
                    {tr.cookieText}
                  </p>
                </div>
                <div className="flex w-full flex-row gap-2 md:w-auto md:justify-end">
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md border border-slate-300 bg-primary px-4 py-2 text-sm font-semibold text-background transition-all hover:bg-primary-hover"
                  >
                    {tr.cookieReadMore}
                  </button>
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="flex-1 md:flex-none inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-background transition-all hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary-hover focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {tr.cookieAccept}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal show={isModalOpen} onClose={handleCloseModal} c_privacyPolicy={c_privacyPolicy} locale={locale} />
    </>
  );
};

export default CookieConsent;
