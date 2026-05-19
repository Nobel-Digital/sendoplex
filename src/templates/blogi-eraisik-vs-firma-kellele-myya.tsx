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
import { BLOG_ARTICLES } from "../data/blogArticles";
import BlogArticlePage from "../components/BlogArticlePage";

const article = BLOG_ARTICLES.find(a => a.slug === "eraisik-vs-firma-kellele-myya")!;

export const config: TemplateConfig = { name: "blogi-eraisik-vs-firma-kellele-myya" };

export const getPath: GetPath<TemplateProps> = () => article.path;

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (): HeadConfig => ({
  title: `${article.title} | Sendoplex blogi`,
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1",
  tags: [
    { type: "meta", attributes: { name: "description", content: article.excerpt } },
    {
      type: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Instrument+Serif:ital@0;1&display=swap",
      },
    },
    { type: "link", attributes: { rel: "icon", type: "image/x-icon", href: "/favicon.ico" } },
  ],
});

const Page: Template<TemplateRenderProps> = () => <BlogArticlePage article={article} />;

export default Page;
