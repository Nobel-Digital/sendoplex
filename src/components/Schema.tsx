import * as React from "react";
import { JsonLd } from "react-schemaorg";
import type {
  LocalBusiness,
  FAQPage,
  Product,
  Offer,
  AggregateOffer,
  OfferCatalog,
  Brand,
  PropertyValue,
  OpeningHoursSpecification,
  PostalAddress,
  GeoCoordinates,
} from "schema-dts";

interface HoursDay {
  openIntervals?: { start: string; end: string }[];
  isClosed?: boolean;
}

interface ServiceItem {
  name?: string;
  description?: string;
  c_serviceDetailedDescription?: unknown;
  price?: { value?: number | string; currency?: string; currencyCode?: string };
  c_currency?: string;
  c_mainServicePhoto?: { url?: string; image?: { url?: string; sourceUrl?: string } };
  photoGallery?: { image?: { url?: string } }[];
  c_documentUpload?: { url?: string; sourceUrl?: string };
}

interface FaqItem {
  name?: string;
  c_faqContent?: string;
}

interface SchemaData {
  name?: string;
  websiteUrl?: string;
  landingPageUrl?: string;
  c_websiteUrl?: string;
  address?: { line1?: string; city?: string; region?: string; postalCode?: string; countryCode?: string };
  emails?: string[];
  email?: string;
  mainPhone?: string;
  phone?: string;
  logo?: { image?: { url?: string } };
  c_logo?: { image?: { url?: string }; url?: string };
  photoGallery?: { image?: { url?: string } }[];
  facebookPageUrl?: string;
  instagramHandle?: string;
  linkedinPageUrl?: string;
  youtubeChannelUrl?: string;
  c_registrationCode?: string;
  registrationCode?: string;
  c_vatNumber?: string;
  vatNumber?: string;
  yextDisplayCoordinate?: { latitude?: number; longitude?: number };
  hours?: Record<string, HoursDay>;
  c_featuredServiceItems?: ServiceItem[];
  c_faqList?: FaqItem[];
}

export interface SchemaProps {
  data?: SchemaData;
}

/**
 * Sendoplex schema
 * - LocalBusiness (automotive car buying service)
 * - OfferCatalog of Products mapped from c_featuredServiceItems
 * - Optional FAQPage
 */
const Schema = ({ data }: SchemaProps) => {
  const name: string = data?.name || "Sendoplex OÜ";
  const url: string | undefined = data?.websiteUrl || data?.landingPageUrl || data?.c_websiteUrl;

  const address = data?.address || {};
  const email: string | undefined = data?.emails?.[0] || data?.email;
  const telephone: string | undefined = data?.mainPhone || data?.phone;

  const logo: string | undefined = data?.logo?.image?.url || data?.c_logo?.image?.url || data?.c_logo?.url;

  const businessImages: string[] =
    (Array.isArray(data?.photoGallery) ? data.photoGallery : [])
      .map((p: { image?: { url?: string } }) => p?.image?.url)
      .filter(Boolean) || [];

  const socialLinks: string[] = [
    data?.facebookPageUrl,
    data?.instagramHandle ? `https://www.instagram.com/${data.instagramHandle}` : null,
    data?.linkedinPageUrl,
    data?.youtubeChannelUrl,
  ].filter(Boolean);

  const registrationCode: string | undefined = data?.c_registrationCode || data?.registrationCode;
  const vatNumber: string | undefined = data?.c_vatNumber || data?.vatNumber;

  const geo =
    data?.yextDisplayCoordinate?.latitude && data?.yextDisplayCoordinate?.longitude
      ? ({
          "@type": "GeoCoordinates",
          latitude: Number(data.yextDisplayCoordinate.latitude),
          longitude: Number(data.yextDisplayCoordinate.longitude),
        } as GeoCoordinates)
      : undefined;

  const openingHoursSpecification: OpeningHoursSpecification[] = data?.hours
    ? Object.entries(data.hours)
        .map(([day, hours]: [string, HoursDay | undefined]) => {
          const interval = hours?.openIntervals?.[0];
          if (!interval?.start || !interval?.end) return null;

          const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: normalizedDay as any,
            opens: interval.start,
            closes: interval.end,
          } as OpeningHoursSpecification;
        })
        .filter(Boolean)
    : [];

  const identifiers: PropertyValue[] = [
    registrationCode
      ? ({ "@type": "PropertyValue", name: "Registration Code", value: registrationCode } as PropertyValue)
      : null,
    vatNumber ? ({ "@type": "PropertyValue", name: "VAT Number", value: vatNumber } as PropertyValue) : null,
  ].filter(Boolean) as PropertyValue[];

  const brand: Brand = {
    "@type": "Brand",
    name,
    ...(logo ? { logo } : {}),
  };

  const toNumber = (val: unknown): number | undefined => {
    if (val === null || val === undefined) return undefined;
    if (typeof val === "number" && Number.isFinite(val)) return val;
    if (typeof val === "string") {
      const cleaned = val.trim().replace(/\s/g, "").replace(",", "."); // "11,78" -> 11.78
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : undefined;
    }
    return undefined;
  };

  /**
   * Map ce_featuredService items into Product schema
   */
  const featuredItems: ServiceItem[] = Array.isArray(data?.c_featuredServiceItems) ? data.c_featuredServiceItems : [];

  const products: Product[] = featuredItems
    .map((item: ServiceItem): Product | null => {
      const productName = item?.name;
      if (!productName) return null;

      const textDescription = item?.description || undefined;

      const currency: string =
        item?.price?.currency || item?.price?.currencyCode || item?.c_currency || "EUR";

      // Primary image sources (ce_featuredService)
      const mainImage =
        item?.c_mainServicePhoto?.url ||
        item?.c_mainServicePhoto?.image?.url ||
        item?.c_mainServicePhoto?.image?.sourceUrl;

      const galleryImages: string[] =
        (Array.isArray(item?.photoGallery) ? item.photoGallery : [])
          .map((p: { image?: { url?: string } }) => p?.image?.url)
          .filter(Boolean) || [];

      const explicitPriceValue = toNumber(item?.price?.value);
      const explicitOffer: Offer | null =
        explicitPriceValue !== undefined
          ? ({
              "@type": "Offer",
              price: explicitPriceValue,
              priceCurrency: currency,
              availability: "https://schema.org/InStock",
              ...(url ? { url } : {}),
            } as Offer)
          : null;

      const offersToUse = explicitOffer ? [explicitOffer] : [];

      let offers: Offer | AggregateOffer | undefined;
      if (offersToUse.length === 1) {
        offers = offersToUse[0];
      } else if (offersToUse.length > 1) {
        const prices = offersToUse
          .map((o) => (typeof o.price === "number" ? o.price : toNumber(o.price)))
          .filter((n): n is number => typeof n === "number" && Number.isFinite(n));
        offers = {
          "@type": "AggregateOffer",
          priceCurrency: currency,
          lowPrice: prices.length ? Math.min(...prices) : undefined,
          highPrice: prices.length ? Math.max(...prices) : undefined,
          offerCount: offersToUse.length,
          offers: offersToUse as any,
        } as AggregateOffer;
      }

      const productImages = [mainImage, ...galleryImages].filter(Boolean);

      const documentUrl =
        item?.c_documentUpload?.url || item?.c_documentUpload?.sourceUrl || undefined;

      const additionalProperty: PropertyValue[] = [
        { "@type": "PropertyValue", name: "Category", value: "Electromechanical manufacturing" },
        documentUrl ? ({ "@type": "PropertyValue", name: "Product document", value: documentUrl } as PropertyValue) : null,
      ].filter(Boolean) as PropertyValue[];

      return {
        "@type": "Product",
        name: productName,
        ...(textDescription ? { description: textDescription } : {}),
        ...(productImages.length ? { image: productImages } : {}),
        brand,
        category: "Electromechanical assembly and manufacturing",
        ...(additionalProperty.length ? { additionalProperty } : {}),
        ...(offers ? { offers: offers as any } : {}),
      } as Product;
    })
    .filter(Boolean) as Product[];

  const offerCatalog: OfferCatalog | undefined =
    products.length > 0
      ? ({
          "@type": "OfferCatalog",
          name: "Manufacturing services",
          itemListElement: products as any,
        } as OfferCatalog)
      : undefined;

  // FAQ
  const faqMainEntity =
    Array.isArray(data?.c_faqList) && data.c_faqList.length > 0
      ? data.c_faqList
          .map((faq: FaqItem) => {
            const q = faq?.name;
            const a = faq?.c_faqContent;
            if (!q || !a) return null;
            return {
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            };
          })
          .filter(Boolean)
      : [];

  return (
    <>
      <JsonLd<LocalBusiness>
        item={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          additionalType: "https://schema.org/AutomotiveBusiness",
          name,
          ...(url ? { url } : {}),
          ...(logo ? { logo } : {}),
          ...(businessImages.length ? { image: businessImages } : {}),
          ...(email ? { email } : {}),
          ...(telephone ? { telephone } : {}),
          ...(geo ? { geo } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: address?.line1,
            addressLocality: address?.city,
            addressRegion: address?.region,
            postalCode: address?.postalCode,
            addressCountry: address?.countryCode,
          } as PostalAddress,
          ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
          ...(identifiers.length ? { identifier: identifiers } : {}),
          ...(socialLinks.length ? { sameAs: socialLinks } : {}),
          ...(offerCatalog ? { hasOfferCatalog: offerCatalog as any } : {}),
          knowsAbout: [
            "Cable harness manufacturing",
            "Electromechanical assembly",
            "Sheet metal bending",
            "Sheet metal welding",
            "MIG/MAG welding",
            "TIG welding",
            "Product development",
            "Supply chain management",
            "Small series manufacturing",
          ],
        }}
      />

      {faqMainEntity.length > 0 && (
        <JsonLd<FAQPage>
          item={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqMainEntity as any,
          }}
        />
      )}
    </>
  );
};

export default Schema;
