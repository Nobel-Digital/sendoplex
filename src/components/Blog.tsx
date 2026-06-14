import * as React from "react";
import { t } from "../i18n";

export interface BlogArticle {
  name: string;
  c_blogExcerpt?: string;
  c_blogDate?: string;
  c_blogReadMinutes?: number;
  c_blogCategory?: string;
  c_blogThumbnail?: { image?: { url: string }; altText?: string };
  slug?: string;
}

export interface BlogProps {
  c_blogSectionEyebrow?: string;
  c_blogSectionTitle?: string;
  c_blogSectionDescription?: string;
  c_blogArticles?: BlogArticle[];
  locale?: string;
}

const DEFAULT_SECTION_TITLE = "Auto müügist arusaadavalt.";
const DEFAULT_SECTION_DESC  =
  "Vahel on kõige kasulikum see, mida müüja Sulle ei räägi. Kogume kokku küsimused, mida kliendid meile kõige sagedamini esitavad — ja vastame ausalt.";

import { BLOG_ARTICLES } from "../data/blogArticles";

const DEFAULT_ARTICLES: BlogArticle[] = BLOG_ARTICLES.map(a => ({
  name:               a.title,
  c_blogCategory:     a.category,
  c_blogDate:         a.date,
  c_blogReadMinutes:  a.readMinutes,
  c_blogExcerpt:      a.excerpt,
  slug:               a.path,   // full path so href="/{path}" works correctly
}));

const THUMB_COLORS = ["bg-brand", "bg-brand-soft", "bg-brand-tint", "bg-primary/20"];

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Blog: React.FC<BlogProps> = ({
  c_blogSectionEyebrow,
  c_blogSectionTitle,
  c_blogSectionDescription,
  c_blogArticles,
  locale = "et",
}) => {
  const tr = t(locale);

  // Use CMS articles if available, otherwise show placeholders
  const articles =
    Array.isArray(c_blogArticles) && c_blogArticles.length > 0
      ? c_blogArticles
      : DEFAULT_ARTICLES;

  const sectionTitle = c_blogSectionTitle ?? DEFAULT_SECTION_TITLE;
  const sectionDesc  = c_blogSectionDescription ?? DEFAULT_SECTION_DESC;

  return (
    <section className="bg-background border-b border-divider py-20 px-6 md:px-10" id="blogi">
      <div className="container mx-auto max-w-screen-xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 mb-12">
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              {c_blogSectionEyebrow ?? "Blogi ja nõuanded"}
            </span>
            <h2 className="text-section-title font-bold text-foreground leading-tight">
              {sectionTitle}
            </h2>
          </div>
          <p className="mt-6 md:mt-2 md:w-80 text-foreground/55 text-sm leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => {
            const href     = article.slug ? `/${article.slug}` : "#";
            const thumbUrl = article.c_blogThumbnail?.image?.url;
            const thumbAlt = article.c_blogThumbnail?.altText || article.name;

            return (
              <a
                key={i}
                href={href}
                className="group flex flex-col rounded-2xl border border-divider bg-white overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Thumbnail */}
                <div className={`aspect-[4/3] overflow-hidden ${!thumbUrl ? THUMB_COLORS[i % THUMB_COLORS.length] : ""}`}>
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={thumbAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-white" aria-hidden="true">
                        <path d="M10 22l3-8h22l3 8M10 22H8a2 2 0 00-2 2v5h2m2-7h28m0 0h2a2 2 0 012 2v5h-2m-2-7l1 7M10 29l-1 7m0 0h2m26 0h2M15 36a2 2 0 100-4 2 2 0 000 4zm18 0a2 2 0 100-4 2 2 0 000 4z"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center gap-2 text-[11px] text-foreground/45 font-medium mb-3 flex-wrap">
                    {article.c_blogCategory && (
                      <span className="rounded-full bg-brand-tint text-brand px-2.5 py-0.5 text-[10px] font-semibold">
                        {article.c_blogCategory}
                      </span>
                    )}
                    {article.c_blogDate && <span>{article.c_blogDate}</span>}
                    {article.c_blogReadMinutes && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{article.c_blogReadMinutes} {tr.blogReadMin}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-brand-soft transition-colors">
                    {article.name}
                  </h3>

                  {article.c_blogExcerpt && (
                    <p className="text-xs text-foreground/55 leading-relaxed line-clamp-3 flex-1">
                      {article.c_blogExcerpt}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>

        {/* All articles CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="/blogi"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 text-foreground px-6 py-3 text-sm font-semibold transition-all hover:border-foreground/50 hover:bg-foreground/5"
          >
            {tr.blogAllArticles}
            <ArrowIcon />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Blog;
