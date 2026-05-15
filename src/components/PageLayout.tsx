import * as React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { AnalyticsProvider, AnalyticsScopeProvider } from "@yext/pages-components";
import { TemplateProps } from "@yext/pages";
import ChatWidget from "./chat/ChatWidget";

export interface PageLayoutProps {
  children?: React.ReactNode;
  data?: any;
  templateData: TemplateProps;
}

const PageLayout = ({ children, data, templateData }: PageLayoutProps) => {
  const locale = templateData.document?.meta?.locale ?? "et";

  return (
    <AnalyticsProvider templateData={templateData}>
      <div className="min-h-screen">
        <Navigation
          data={{
            logo:               data.logo,
            locale,
            c_navigationButton: data.c_navigationButton,
            c_availableLocales: data.c_availableLocales,
          }}
        />
        {children}
        <AnalyticsScopeProvider name="footer">
          <Footer
            c_privacyPolicy={data.c_privacyPolicy}
            locale={locale}
            name={data.name}
            mainPhone={data.mainPhone}
            emails={data.emails}
            address={data.address}
            hours={data.hours}
            c_registrationCode={data.c_registrationCode}
            c_vatNumber={data.c_vatNumber}
            c_availableLocales={data.c_availableLocales}
            facebookPageUrl={data.facebookPageUrl}
            instagramHandle={data.instagramHandle}
          />
        </AnalyticsScopeProvider>
        <ChatWidget
          locale={locale}
          c_basicFormTitle={data.c_basicFormTitle}
          c_basicFormDescription={data.c_basicFormDescription}
        />
      </div>
    </AnalyticsProvider>
  );
};

export default PageLayout;
