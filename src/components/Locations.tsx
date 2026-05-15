import * as React from "react";
import BasicForm from "./BasicForm";
import Hours, { HolidayHour } from "./Hours";
import { t } from "../i18n";

interface MapIframeJson {
  json?: {
    root?: {
      children?: Array<{
        children?: Array<{
          text?: string;
        }>;
      }>;
    };
  };
}

interface LocationsProps {
  description: string;
  phone: string;
  c_locationSectionTitle: string;
  c_locationSectionDescription: string;
  hours?: Record<string, { openIntervals?: { start: string; end: string }[]; isClosed?: boolean }>;
  holidayHours?: HolidayHour[];
  c_mapIframe?: MapIframeJson;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    postalCode: string;
    localizedCountryName: string;
  };
  c_basicFormTitle?: string;
  c_basicFormDescription?: string;
  locale?: string;
  c_hoursTitle?: string;
}

const Locations: React.FC<LocationsProps> = ({
  c_locationSectionTitle,
  c_locationSectionDescription,
  hours,
  holidayHours,
  address,
  c_mapIframe,
  c_basicFormTitle,
  c_basicFormDescription,
  locale = "et",
  c_hoursTitle,
}) => {
  const tr = t(locale);
  const formattedAddress = address
    ? `${address.line1}${address.line2 ? `, ${address.line2}` : ""}, ${address.city}, ${address.postalCode}, ${address.localizedCountryName}`
    : "";
  const iframeHtml =
    c_mapIframe?.json?.root?.children?.[0]?.children?.[0]?.text || "";

  const iframeSrc = (() => {
    const match = iframeHtml.match(/src=["']([^"']+)["']/i);
    if (!match) return null;
    try {
      const url = new URL(match[1]);
      return url.protocol === "https:" ? url.href : null;
    } catch {
      return null;
    }
  })();

  return (
    <section
      id="kontakt"
      className="flex justify-center py-20 px-6 bg-background border-b border-divider scroll-mt-24"
    >
      <div className="container max-w-screen-xl flex flex-col md:flex-row gap-10 w-full">
        {/* Left column */}
        <div className="w-full md:w-1/2 md:pr-12">
          <h2 className="text-section-title font-bold mb-6 text-foreground">
            {c_locationSectionTitle}
          </h2>
          <p className="text-lg leading-8 text-foreground/90 mb-6">
            {c_locationSectionDescription}
          </p>
          {hours && (
            <div className="mb-6">
              <Hours
                title={c_hoursTitle}
                hours={hours}
                holidayHours={holidayHours}
                locale={locale}
              />
            </div>
          )}
          {formattedAddress && (
            <div className="mb-4 text-sm text-foreground">
              <span className="font-semibold text-foreground">{tr.locationsAddress}</span>{" "}
              {formattedAddress}
            </div>
          )}
          {iframeSrc && (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="relative w-full aspect-[16/9]">
                <iframe
                  src={iframeSrc}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={tr.locationsAddress}
                />
              </div>
            </div>
          )}
        </div>
        {/* Right column */}
        <div id="kontakt-vorm" className="w-full md:w-1/2">
          <BasicForm
            c_basicFormTitle={c_basicFormTitle}
            c_basicFormDescription={c_basicFormDescription}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
};

export default Locations;
