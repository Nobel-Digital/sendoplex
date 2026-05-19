import * as React from "react";
import { BlogArticleData, BLOG_ARTICLES } from "../data/blogArticles";
import BlogLayout from "./BlogLayout";

const CATEGORY_COLORS: Record<string, string> = {
  "Müügiõpetus": "bg-brand text-white",
  "Hindamine":   "bg-primary/20 text-brand",
  "Nõuanded":    "bg-brand-tint text-brand",
  "Tehnika":     "bg-foreground/8 text-foreground",
};

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface BlogArticlePageProps {
  article: BlogArticleData;
}

const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ article }) => {
  const catClass = CATEGORY_COLORS[article.category] ?? "bg-brand-tint text-brand";
  const related  = BLOG_ARTICLES.filter(a => a.slug !== article.slug).slice(0, 3);

  return (
    <BlogLayout backHref="/blogi" backLabel="← Blogi">
      {/* Article */}
      <div className="container mx-auto max-w-2xl px-6 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-foreground/40 mb-8 flex-wrap">
          <a href="/" className="hover:text-foreground/70 transition-colors">Sendoplex</a>
          <span aria-hidden="true">/</span>
          <a href="/blogi" className="hover:text-foreground/70 transition-colors">Blogi</a>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/60 truncate max-w-[20ch]">{article.title}</span>
        </nav>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`text-[10px] font-semibold rounded-full px-2.5 py-0.5 ${catClass}`}>
            {article.category}
          </span>
          <span className="text-xs text-foreground/40">{article.date}</span>
          <span className="text-foreground/20 text-xs" aria-hidden="true">·</span>
          <span className="text-xs text-foreground/40">{article.readMinutes} min lugemist</span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-8"
          style={{ letterSpacing: "-0.02em" }}
        >
          {article.title}
        </h1>

        {/* Lead / excerpt */}
        <p className="text-base text-foreground/60 leading-relaxed mb-10 border-l-2 border-primary pl-4 italic">
          {article.excerpt}
        </p>

        {/* Body */}
        <div className="space-y-5 mb-10">
          {article.body.map((para, i) => (
            <p key={i} className="text-[15px] text-foreground/75 leading-relaxed">{para}</p>
          ))}
        </div>

        {/* Tips block */}
        {article.tips && article.tips.length > 0 && (
          <div className="bg-white rounded-2xl border border-divider p-6 sm:p-8 mb-10">
            {article.tipsHeading && (
              <h2 className="text-lg font-bold text-foreground mb-6">{article.tipsHeading}</h2>
            )}
            <ol className="space-y-5">
              {article.tips.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-brand text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/75 leading-relaxed">{tip}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Inline CTA */}
        <div className="rounded-2xl bg-brand text-white p-8 text-center my-12">
          <h3 className="text-xl font-bold mb-2">Müü oma auto Sendoplexile</h3>
          <p className="text-white/65 text-sm mb-6">
            Pakkumine 1 tunni jooksul. Raha samal päeval. Tasuta vormistus.
          </p>
          <a
            href="/#form"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-brand px-6 py-3 text-sm font-bold hover:bg-primary-hover transition-colors"
          >
            Paku oma autot
            <ArrowIcon />
          </a>
        </div>

        {/* Back link */}
        <div className="flex justify-center mt-4">
          <a
            href="/blogi"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            ← Kõik artiklid
          </a>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-divider bg-white">
          <div className="container mx-auto max-w-screen-xl px-6 py-12">
            <h2 className="text-xs font-semibold text-foreground/40 tracking-widest uppercase mb-6">
              Loe ka
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <a
                  key={rel.slug}
                  href={`/${rel.path}`}
                  className="group rounded-xl border border-divider bg-background p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                    {rel.category}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-foreground leading-snug group-hover:text-brand-soft transition-colors">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/50 leading-relaxed line-clamp-2">
                    {rel.excerpt}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </BlogLayout>
  );
};

export default BlogArticlePage;
