import * as React from "react";

const CarIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
    <path d="M4 9l1.5-4h9L16 9M4 9H3a1 1 0 00-1 1v2h1m1-3h12m0 0h1a1 1 0 011 1v2h-1m-1-3l.5 3M4 12l-.5 3m0 0h1m11 0h1M6.5 15a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface BlogLayoutProps {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  backHref = "/blogi",
  backLabel = "← Blogi",
}) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/88 backdrop-blur-xl border-b border-black/8 shadow-sm">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <nav className="flex justify-between items-center py-4">
            <a href="/" className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white shrink-0">
                <CarIcon />
              </span>
              <span className="text-base font-bold tracking-tight text-foreground">sendoplex</span>
            </a>
            <a
              href={backHref}
              className="text-sm font-medium text-foreground/55 hover:text-foreground transition-colors"
            >
              {backLabel}
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-20">{children}</main>

      <footer className="border-t border-divider mt-20 py-8 px-6">
        <div className="container mx-auto max-w-screen-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-foreground/40">
            © {new Date().getFullYear()} Sendoplex OÜ. Kõik õigused kaitstud.
          </span>
          <a
            href="/"
            className="text-xs text-foreground/40 hover:text-foreground/70 transition-colors"
          >
            ← Tagasi pealehele
          </a>
        </div>
      </footer>
    </div>
  );
};

export default BlogLayout;
