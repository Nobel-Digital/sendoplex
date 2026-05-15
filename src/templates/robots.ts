import { TemplateConfig } from "@yext/pages";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "robots",
};

export const getPath = () => {
  return `robots.txt`;
};

export const render = (): string => {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    "Sitemap: /sitemap.xml",
  ].join("\n");
};
