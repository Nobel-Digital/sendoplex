import * as React from "react";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";

import About from "../components/About";
import Banner from "../components/Banner";
import Blog from "../components/Blog";
import CarOfferForm from "../components/CarOfferForm";
import ContactSection from "../components/ContactSection";
import ErrorBoundary from "../components/ErrorBoundary";
import Faqs from "../components/Faqs";
import ImageGallery from "../components/ImageGallery";
import PageLayout from "../components/PageLayout";
import Parts from "../components/Parts";
import Schema from "../components/Schema";
import Services from "../components/Services";
import What from "../components/What";
import Why from "../components/Why";

export const config: TemplateConfig = {
  stream: {
    $id: "Location",
    filter: {
      entityIds: ["387714557506965021"],
    },
    fields: [
      // ── Core ──────────────────────────────────────────────────────────────
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "mobilePhone",
      "facebookPageUrl",
      "instagramHandle",
      "description",
      "hours",
      "slug",
      "logo",
      "photoGallery",
      "emails",
      "yextDisplayCoordinate",
      // ── Site / brand ──────────────────────────────────────────────────────
      "c_favicon",
      "c_registrationCode",
      "c_vatNumber",
      "c_availableLocales",
      "c_privacyPolicy",
      "c_termsContent",
      "c_cookiesContent",
      // ── Navigation ────────────────────────────────────────────────────────
      "c_navigationButton",
      // ── Hero / Banner ─────────────────────────────────────────────────────
      "c_heroImage",
      "c_heroSlogan",
      "c_heroDescription",
      "c_heroButton",
      "c_heroSecondaryButton",
      "c_heroStatKicker",
      "c_heroStatNumber",
      "c_heroStatLabel",
      "c_trustItemLabels",
      "c_trustItemValues",
      // ── Parts / Varuosad ──────────────────────────────────────────────────
      "c_partsSectionEyebrow",
      "c_partsSectionTitle",
      "c_partsSectionDescription",
      "c_partsContactEmail",
      // ── Car offer form ────────────────────────────────────────────────────
      "c_carFormEyebrow",
      "c_carFormTitle",
      "c_carFormDescription",
      "c_carFormBullets",
      "c_carFormTestimonialQuote",
      "c_carFormTestimonialAuthor",
      "c_carFormTestimonialMeta",
      "c_carFormEndpoint",
      // ── About ─────────────────────────────────────────────────────────────
      "c_aboutEyebrow",
      "c_aboutTitle",
      "c_aboutDescription",
      "c_aboutPhoto",
      "c_aboutSignature",
      "c_aboutFounderLabel",
      // ── Blog ──────────────────────────────────────────────────────────────
      "c_blogSectionEyebrow",
      "c_blogSectionTitle",
      "c_blogSectionDescription",
      // ── Contact ───────────────────────────────────────────────────────────
      "c_contactEyebrow",
      "c_contactSectionTitle1",
      "c_contactSectionTitle2",
      "c_contactSectionTitle3",
      "c_mapIframe",
      // ── Optional retained sections ────────────────────────────────────────
      "c_locationSectionTitle",
      "c_locationSectionDescription",
      "c_whySectionTitle",
      "c_featuredserviceTitle",
      "c_simpleServicesproductsTitle",
      "c_photoGalleryTitle",
      "c_hoursTitle",
      "c_basicFormTitle",
      "c_basicFormDescription",
      "c_faqTitle",
    ],
    localization: {
      locales: ["et", "en_EE", "fi", "ru"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  const locale = (document.meta?.locale ?? "et").split(/[-_]/)[0].toLowerCase();
  // Non-ET locales always use the locale code as path (/en, /fi, /ru).
  // Ignoring document.slug prevents inheriting the ET slug ("index.html")
  // which would cause a path collision and silently drop the locale page.
  if (locale !== "et") return locale;
  return document.slug || "index";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({ document }): HeadConfig => ({
  title: document.name,
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1",
  tags: [
    {
      type: "meta",
      attributes: { name: "description", content: document.description },
    },
    {
      type: "meta",
      attributes: {
        property: "og:image",
        content: document.photoGallery ? document.photoGallery[0].image.url : null,
      },
    },
    {
      type: "link",
      attributes: {
        rel: "icon",
        type: "image/x-icon",
        href: document.c_favicon?.url ?? "/favicon.ico",
      },
    },
    {
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Instrument+Serif:ital@0;1&display=swap",
      },
    },
    {
      type: "script",
      attributes: {
        src: "https://www.google.com/recaptcha/api.js?render=6LczPcIsAAAAAApLNObJHxo48z8MME8XOsUQp99V",
        async: "true",
      },
    },
  ],
});

const Location: Template<TemplateRenderProps> = ({ __meta, document }) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    mobilePhone,
    facebookPageUrl,
    instagramHandle,
    description,
    emails,
    logo,
    photoGallery,
    // Hero
    c_heroImage,
    c_heroSlogan,
    c_heroDescription,
    c_heroButton,
    c_heroSecondaryButton,
    c_heroStatKicker,
    c_heroStatNumber,
    c_heroStatLabel,
    c_heroTrustItems,
    c_trustItemLabels,
    c_trustItemValues,
    // Parts
    c_partsSectionEyebrow,
    c_partsSectionTitle,
    c_partsSectionDescription,
    c_partnerPlatforms,
    c_partsContactEmail,
    // Car offer form
    c_carFormEyebrow,
    c_carFormTitle,
    c_carFormDescription,
    c_carFormBullets,
    c_carFormTestimonialQuote,
    c_carFormTestimonialAuthor,
    c_carFormTestimonialMeta,
    c_carFormEndpoint,
    // About
    c_aboutEyebrow,
    c_aboutTitle,
    c_aboutDescription,
    c_aboutPhoto,
    c_aboutStats,
    c_aboutSignature,
    c_aboutFounderLabel,
    // Blog
    c_blogSectionEyebrow,
    c_blogSectionTitle,
    c_blogSectionDescription,
    c_blogArticles,
    // Contact
    c_contactEyebrow,
    c_contactSectionTitle1,
    c_contactSectionTitle2,
    c_contactSectionTitle3,
    c_mapIframe,
    c_registrationCode,
    c_vatNumber,
    // Optional retained
    c_locationSectionTitle,
    c_locationSectionDescription,
    c_whySectionTitle,
    c_whyItems,
    c_featuredserviceTitle,
    c_featuredServiceItems,
    c_simpleServicesproductsList,
    c_simpleServicesproductsTitle,
    c_photoGalleryTitle,
    c_hoursTitle,
    c_basicFormTitle,
    c_basicFormDescription,
    c_faqTitle,
    // Nav / layout
    c_navigationButton,
    c_privacyPolicy,
    c_termsContent,
    c_cookiesContent,
    c_availableLocales,
  } = document;

  const locale = document.meta?.locale ?? "et";

  const layoutData = {
    name,
    description,
    mainPhone,
    mobilePhone,
    emails,
    logo,
    hours,
    c_heroImage,
    c_aboutTitle,
    c_aboutDescription,
    c_aboutPhoto,
    c_locationSectionTitle,
    c_locationSectionDescription,
    c_registrationCode,
    c_vatNumber,
    c_mapIframe,
    c_availableLocales,
    c_navigationButton,
    c_heroButton,
    c_heroSlogan,
    c_heroDescription,
    c_featuredServiceItems,
    c_simpleServicesproductsList,
    c_basicFormTitle,
    c_basicFormDescription,
    c_privacyPolicy,
    c_termsContent,
    c_cookiesContent,
    facebookPageUrl,
    instagramHandle,
    c_faqTitle,
  };

  return (
    <>
      <Schema data={document} />
      <PageLayout data={layoutData} templateData={{ __meta, document }}>
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <ErrorBoundary>
          <Banner
            c_heroImage={c_heroImage}
            c_heroSlogan={c_heroSlogan}
            c_heroDescription={c_heroDescription}
            c_heroButton={c_heroButton}
            c_heroSecondaryButton={c_heroSecondaryButton}
            c_heroStatKicker={c_heroStatKicker}
            c_heroStatNumber={c_heroStatNumber}
            c_heroStatLabel={c_heroStatLabel}
            c_trustItemLabels={c_trustItemLabels}
            c_trustItemValues={c_trustItemValues}
            locale={locale}
          />
        </ErrorBoundary>

        {/* ── Varuosad / Parts ─────────────────────────────────────────────── */}
        <ErrorBoundary>
          <Parts
            c_partsSectionEyebrow={c_partsSectionEyebrow}
            c_partsSectionTitle={c_partsSectionTitle}
            c_partsSectionDescription={c_partsSectionDescription}
            c_partnerPlatforms={c_partnerPlatforms}
            c_partsContactEmail={c_partsContactEmail}
            mainPhone={mainPhone}
            locale={locale}
          />
        </ErrorBoundary>

        {/* ── Car offer form ────────────────────────────────────────────────── */}
        <ErrorBoundary>
          <CarOfferForm
            c_carFormEyebrow={c_carFormEyebrow}
            c_carFormTitle={c_carFormTitle}
            c_carFormDescription={c_carFormDescription}
            c_carFormBullets={c_carFormBullets}
            c_carFormTestimonialQuote={c_carFormTestimonialQuote}
            c_carFormTestimonialAuthor={c_carFormTestimonialAuthor}
            c_carFormTestimonialMeta={c_carFormTestimonialMeta}
            c_carFormEndpoint={c_carFormEndpoint}
            locale={locale}
          />
        </ErrorBoundary>

        {/* ── About ─────────────────────────────────────────────────────────── */}
        <ErrorBoundary>
          <About
            c_aboutEyebrow={c_aboutEyebrow}
            c_aboutTitle={c_aboutTitle}
            c_aboutDescription={c_aboutDescription}
            c_aboutPhoto={c_aboutPhoto}
            c_aboutStats={c_aboutStats}
            c_aboutSignature={c_aboutSignature}
            c_aboutFounderLabel={c_aboutFounderLabel}
            description={description}
            locale={locale}
          />
        </ErrorBoundary>

        {/* ── Optional: Services (if populated) ─────────────────────────────── */}
        {c_featuredServiceItems && c_featuredServiceItems.length > 0 && (
          <ErrorBoundary>
            <Services
              services={c_featuredServiceItems}
              c_featuredserviceTitle={c_featuredserviceTitle}
              locale={locale}
            />
          </ErrorBoundary>
        )}

        {/* ── Optional: What/Simple products (if populated) ─────────────────── */}
        {c_simpleServicesproductsList && c_simpleServicesproductsList.length > 0 && (
          <ErrorBoundary>
            <What
              items={c_simpleServicesproductsList}
              c_simpleServicesproductsTitle={c_simpleServicesproductsTitle}
            />
          </ErrorBoundary>
        )}

        {/* ── Optional: Why (if populated) ──────────────────────────────────── */}
        {c_whyItems && c_whyItems.length > 0 && (
          <ErrorBoundary>
            <Why c_whySectionTitle={c_whySectionTitle} c_whyItems={c_whyItems} />
          </ErrorBoundary>
        )}

        {/* ── Optional: Photo gallery (if populated) ────────────────────────── */}
        {photoGallery && photoGallery.length > 0 && (
          <ErrorBoundary>
            <ImageGallery photoGallery={photoGallery} c_photoGalleryTitle={c_photoGalleryTitle} />
          </ErrorBoundary>
        )}

        {/* ── Blog ─────────────────────────────────────────────────────────── */}
        <ErrorBoundary>
          <Blog
            c_blogSectionEyebrow={c_blogSectionEyebrow}
            c_blogSectionTitle={c_blogSectionTitle}
            c_blogSectionDescription={c_blogSectionDescription}
            c_blogArticles={c_blogArticles}
            locale={locale}
          />
        </ErrorBoundary>

        {/* ── Optional: FAQs (if populated) ────────────────────────────────── */}
        {document.c_faqList && document.c_faqList.length > 0 && (
          <ErrorBoundary>
            <Faqs c_faqTitle={c_faqTitle} faqs={document.c_faqList} />
          </ErrorBoundary>
        )}

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <ErrorBoundary>
          <ContactSection
            c_contactEyebrow={c_contactEyebrow}
            address={address}
            phone={mainPhone}
            mobilePhone={mobilePhone}
            emails={emails}
            c_registrationCode={c_registrationCode}
            c_vatNumber={c_vatNumber}
            c_contactSectionTitle1={c_contactSectionTitle1}
            c_contactSectionTitle2={c_contactSectionTitle2}
            c_contactSectionTitle3={c_contactSectionTitle3}
            name={name}
            instagramHandle={instagramHandle}
            facebookPageUrl={facebookPageUrl}
            c_mapIframe={c_mapIframe}
            hours={hours}
            locale={locale}
          />
        </ErrorBoundary>
      </PageLayout>
    </>
  );
};

export default Location;
