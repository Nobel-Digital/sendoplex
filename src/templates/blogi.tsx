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
import BlogLayout from "../components/BlogLayout";

export const config: TemplateConfig = { name: "blogi" };

export const getPath: GetPath<TemplateProps> = () => "blogi";

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (): HeadConfig => ({
  title: "Blogi ja nõuanded | Sendoplex",
  charset: "UTF-8",
  viewport: "width=device-width, initial-scale=1",
  tags: [
    {
      type: "meta",
      attributes: {
        name: "description",
        content: "Sendoplexi blogi — praktilised nõuanded auto müümiseks, hindamiseks ja tehnikaks.",
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
      type: "link",
      attributes: { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    },
  ],
});

const THUMB_COLORS = ["bg-brand", "bg-brand-soft", "bg-brand-tint", "bg-primary/20"];

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BlogiPage: Template<TemplateRenderProps> = () => {
  return (
    <BlogLayout backHref="/" backLabel="← Sendoplex.ee">
      {/* Archive header */}
      <div className="container mx-auto max-w-screen-xl px-6 py-16">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
          Blogi ja nõuanded
        </span>
        <h1
          className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          Auto müügist arusaadavalt.
        </h1>
        <p className="text-foreground/55 text-sm leading-relaxed max-w-[52ch] mb-14">
          Vahel on kõige kasulikum see, mida müüja Sulle ei räägi. Kogume kokku küsimused, mida
          kliendid meile kõige sagedamini esitavad — ja vastame ausalt.
        </p>

        {/* Article grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_ARTICLES.map((article, i) => (
            <a
              key={article.slug}
              href={`/${article.path}`}
              className="group flex flex-col rounded-2xl border border-divider bg-white overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Placeholder thumbnail */}
              <div
                className={`aspect-[4/3] flex items-center justify-center ${THUMB_COLORS[i % THUMB_COLORS.length]}`}
              >
                <div className="opacity-20">
                  <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-white" aria-hidden="true">
                    <path
                      d="M10 22l3-8h22l3 8M10 22H8a2 2 0 00-2 2v5h2m2-7h28m0 0h2a2 2 0 012 2v5h-2m-2-7l1 7M10 29l-1 7m0 0h2m26 0h2M15 36a2 2 0 100-4 2 2 0 000 4zm18 0a2 2 0 100-4 2 2 0 000 4z"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 text-[11px] text-foreground/45 font-medium mb-3 flex-wrap">
                  <span className="rounded-full bg-brand-tint text-brand px-2.5 py-0.5 text-[10px] font-semibold">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readMinutes} min</span>
                </div>
                <h2 className="text-sm font-bold text-foreground leading-snug mb-2 group-hover:text-brand-soft transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs text-foreground/55 leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                  Loe edasi <ArrowIcon />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom CTA band */}
      <div className="bg-brand">
        <div className="container mx-auto max-w-screen-xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Müü oma auto Sendoplexile</h2>
          <p className="text-white/65 text-sm mb-8">Pakkumine 1 tunni jooksul. Raha samal päeval.</p>
          <a
            href="/#form"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-brand px-7 py-3.5 text-sm font-bold hover:bg-primary-hover transition-colors"
          >
            Paku oma autot <ArrowIcon />
          </a>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BlogiPage;
