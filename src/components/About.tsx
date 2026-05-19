import * as React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

interface TextNode       { type: "text" | "linebreak"; text: string; format: number; children?: never }
interface ImageNode      { type: "image" | "upload" | "media" | "asset"; src?: string; url?: string; width?: number; height?: number; alt?: string; title?: string; image?: { url: string; width?: number; height?: number }; fields?: { image?: { url: string; width?: number; height?: number }; asset?: { url: string; width?: number; height?: number }; file?: { url: string; width?: number; height?: number }; media?: { url: string; width?: number; height?: number }; alt?: string; title?: string }; children?: never }
interface LinkNode       { type: "link"; url?: string; fields?: { url?: string }; children: RichTextNode[] }
interface ParagraphNode  { type: "paragraph"; children: RichTextNode[] }
interface HeadingNode    { type: "heading"; tag?: string; format?: string | number; children: RichTextNode[] }
interface ListNode       { type: "list"; listType: "bullet" | "number"; children: RichTextNode[] }
interface ListItemNode   { type: "listitem"; children: RichTextNode[] }
interface HRNode         { type: "horizontalrule"; children?: never }
interface TableNode      { type: "table"; children: RichTextNode[] }
interface TableRowNode   { type: "tablerow"; children: RichTextNode[] }
interface TableCellNode  { type: "tablecell"; headerState?: number; isHeader?: boolean; children: RichTextNode[] }
interface BaseNode       { type: string; children?: RichTextNode[] }

type RichTextNode =
  | TextNode | ImageNode | LinkNode | ParagraphNode | HeadingNode
  | ListNode | ListItemNode | HRNode | TableNode | TableRowNode | TableCellNode
  | BaseNode;

interface RichTextJson { root: { children: RichTextNode[] } }

const FORMAT = { BOLD: 1, ITALIC: 2, UNDERLINE: 4, STRIKETHROUGH: 8 };

function hasFormat(node: TextNode, flag: number) {
  const f = typeof node?.format === "number" ? node.format : 0;
  return (f & flag) === flag;
}

function renderTextNode(node: TextNode, key: React.Key) {
  let content: React.ReactNode = node?.text ?? "";
  if (hasFormat(node, FORMAT.BOLD))          content = <strong>{content}</strong>;
  if (hasFormat(node, FORMAT.ITALIC))        content = <em>{content}</em>;
  if (hasFormat(node, FORMAT.UNDERLINE))     content = <span className="underline">{content}</span>;
  if (hasFormat(node, FORMAT.STRIKETHROUGH)) content = <span className="line-through">{content}</span>;
  if (node?.type === "linebreak") return <br key={key} />;
  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function getImageFromNode(node: ImageNode): { url: string; width?: number; height?: number; alt?: string } | null {
  const url =
    node?.src || node?.url || node?.image?.url ||
    node?.fields?.image?.url || node?.fields?.asset?.url ||
    node?.fields?.file?.url || node?.fields?.media?.url;
  if (!url || typeof url !== "string") return null;
  const width  = node?.width  || node?.image?.width  || node?.fields?.image?.width;
  const height = node?.height || node?.image?.height || node?.fields?.image?.height;
  const alt = node?.alt || node?.title || node?.fields?.alt || node?.fields?.title || "Image";
  return { url, width, height, alt };
}

function renderChildren(children: RichTextNode[] = [], ctx?: { inTableCell?: boolean }) {
  return children.map((child, idx) => renderNode(child, idx, ctx));
}

function renderNode(node: RichTextNode, key: React.Key, ctx: { inTableCell?: boolean } = {}): React.ReactNode {
  if (!node) return null;
  if (node.type === "text") return renderTextNode(node, key);
  if (node.type === "image" || node.type === "upload" || node.type === "media" || node.type === "asset") {
    const img = getImageFromNode(node);
    if (!img) return null;
    const w = img.width || 1400; const h = img.height || 900;
    return (
      <span key={key} className="inline-flex max-w-full">
        <Item original={img.url} thumbnail={img.url} width={w} height={h} title={img.alt}>
          {({ ref, open }) => (
            <button type="button" onClick={open} className="inline-flex items-start leading-none" aria-label={`Open image: ${img.alt}`}>
              <img ref={ref as any} src={img.url} alt={img.alt} loading="lazy"
                className="block w-[72px] sm:w-[84px] max-h-[40px] sm:max-h-[44px] h-auto rounded border border-slate-200 bg-white object-contain cursor-zoom-in hover:opacity-90 transition-opacity" />
            </button>
          )}
        </Item>
      </span>
    );
  }
  if (node.type === "link") {
    const url = node?.url || node?.fields?.url || "#";
    return <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 break-words">{renderChildren(node.children, ctx)}</a>;
  }
  if (node.type === "paragraph") {
    const mb = ctx.inTableCell ? "mb-0" : "mb-4";
    return <p key={key} className={`${mb} font-light leading-7 text-foreground/80`}>{renderChildren(node.children, ctx)}</p>;
  }
  if (node.type === "heading") {
    const tag: string = node?.tag || (typeof node?.format === "string" ? node.format : "");
    const level = tag?.startsWith("h") ? tag : `h${node?.format || 2}`;
    const base = "mt-6 mb-3 font-semibold text-foreground";
    if (level === "h1") return <h1 key={key} className={`${base} text-2xl`}>{renderChildren(node.children, ctx)}</h1>;
    if (level === "h2") return <h2 key={key} className={`${base} text-xl`}>{renderChildren(node.children, ctx)}</h2>;
    if (level === "h3") return <h3 key={key} className={`${base} text-lg`}>{renderChildren(node.children, ctx)}</h3>;
    return <h4 key={key} className={`${base} text-base`}>{renderChildren(node.children, ctx)}</h4>;
  }
  if (node.type === "list") {
    const isBullet = node?.listType === "bullet";
    const ListTag = isBullet ? "ul" : "ol";
    return <ListTag key={key} className={`${isBullet ? "list-disc" : "list-decimal"} pl-6 mb-4 space-y-2`}>{renderChildren(node.children, ctx)}</ListTag>;
  }
  if (node.type === "listitem") return <li key={key}>{renderChildren(node.children, ctx)}</li>;
  if (node.type === "horizontalrule") return <hr key={key} className="my-6 border-foreground/20" />;
  if (node.type === "table") {
    return (
      <div key={key} className="my-6">
        <div className="overflow-x-auto rounded-md border border-foreground/20 bg-white">
          <table className="min-w-[640px] w-full text-left text-sm"><tbody>{renderChildren(node.children, ctx)}</tbody></table>
        </div>
      </div>
    );
  }
  if (node.type === "tablerow") return <tr key={key} className="border-b last:border-b-0 border-foreground/20">{renderChildren(node.children, ctx)}</tr>;
  if (node.type === "tablecell") {
    const isHeader = node?.headerState === 1 || node?.isHeader === true;
    const CellTag = (isHeader ? "th" : "td") as "th" | "td";
    return <CellTag key={key} className={`align-top px-3 py-2 border-r last:border-r-0 border-foreground/20 ${isHeader ? "bg-background font-semibold text-foreground" : "text-foreground"}`}><div className="min-w-[100px]">{renderChildren(node.children, { ...ctx, inTableCell: true })}</div></CellTag>;
  }
  if (Array.isArray(node.children)) return <React.Fragment key={key}>{renderChildren(node.children, ctx)}</React.Fragment>;
  return null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const SERIF_STYLE: React.CSSProperties = {
  fontFamily: "'Instrument Serif', Georgia, serif",
  fontStyle: "italic",
};

/**
 * Renders a stat number string with Instrument Serif applied to the numeric
 * part and plain bold to any letter suffix:
 *   "9 a"   → <em>9</em> a   (number serif, unit plain)
 *   "4.8"   → <em>4.8</em>   (pure decimal: all serif)
 *   "2 800+" → 2 800+        (has "+": all plain bold)
 */
function renderStatNumber(num: string): React.ReactNode {
  // Has letter suffix (e.g. "9 a") — split and apply serif to numeric part only
  const withSuffix = num.match(/^([\d.,\s]+)([a-zA-Z].*)$/);
  if (withSuffix) {
    return (
      <>
        <em style={SERIF_STYLE}>{withSuffix[1].trimEnd()}</em>
        {" " + withSuffix[2]}
      </>
    );
  }
  // Pure decimal or integer (e.g. "4.8", "412") — all serif
  if (/^[\d.,\s]+$/.test(num)) {
    return <em style={SERIF_STYLE}>{num}</em>;
  }
  // Contains "+" or other non-letter suffixes (e.g. "2 800+") — plain bold
  return <>{num}</>;
}

// ── Default content (shown when CMS fields are empty) ─────────────────────────

const DEFAULT_BODY = [
  "Sendoplex on perefirma — ostame ja müüme autosid Eestis ja Soomes alates 2017. aastast. Meie eesmärk on lihtne: pakume Sinu autole ausat hinda, ütleme selgelt välja, kuidas selle hinnani jõudsime, ja vormistame paberid samal päeval.",
  // eslint-disable-next-line quotes
  `Ei mingit lõputut tagasilükku ega kahtlast „garantiitasu”. Vaatame auto üle, paneme hinna paika ja kui tagasi saame, raha on Sinu kontol enne, kui tagasi koju jõuad.`,
];

const DEFAULT_STATS = [
  { number: "9 a",   label: "Kogemust autoturul Eestis ja Soomes" },
  { number: "2 800+", label: "Autot ostetud ja edasi müüdud" },
  { number: "4.8",   label: "Keskmine hinnang Google'is (412 arvustust)" },
];

// Placeholder photo — replaced once c_aboutPhoto is set in Yext
// Car showroom interior — professional and anonymous, no faces
const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80&auto=format&fit=crop";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AboutStat {
  number: string;
  label: string;
}

interface AboutProps {
  c_aboutTitle?: string;
  c_aboutPhoto?: { image?: { url: string }; altText?: string };
  c_aboutDescription?: { json?: RichTextJson };
  description?: string;
  c_aboutStats?: AboutStat[];
  c_aboutSignature?: string;
  c_aboutFounderLabel?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

const About: React.FC<AboutProps> = ({
  c_aboutTitle,
  c_aboutPhoto,
  c_aboutDescription,
  c_aboutStats,
  c_aboutSignature,
  c_aboutFounderLabel,
}) => {
  const nodes = c_aboutDescription?.json?.root?.children;
  const hasRichText = Array.isArray(nodes) && nodes.length > 0;
  const stats = Array.isArray(c_aboutStats) && c_aboutStats.length > 0 ? c_aboutStats : DEFAULT_STATS;
  const photoUrl = c_aboutPhoto?.image?.url ?? FALLBACK_PHOTO;
  const photoAlt = c_aboutPhoto?.altText ?? "Sendoplexi tiim";

  return (
    <section
      className="relative bg-background py-20 md:py-32 overflow-hidden border-b border-divider px-6 md:px-10 scroll-mt-24"
      id="meist"
    >
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left — photo */}
          <div className="w-full md:w-5/12 shrink-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src={photoUrl}
                alt={photoAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-brand/85 backdrop-blur-sm px-4 py-2 text-xs font-medium text-white">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                Sendoplexi tiim · Tallinn
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Meist
            </span>
            {c_aboutTitle && (
              <h2 className="text-section-title font-bold text-foreground leading-tight mb-8">
                {c_aboutTitle}
              </h2>
            )}

            {/* Body: CMS rich text OR default paragraphs */}
            {hasRichText ? (
              <div className="text-foreground">
                <Gallery>
                  <div className="leading-relaxed">
                    {nodes!.map((n, i) => renderNode(n, i))}
                  </div>
                </Gallery>
              </div>
            ) : (
              <div className="space-y-4">
                {DEFAULT_BODY.map((para, i) => (
                  <p key={i} className="text-foreground/70 leading-relaxed text-[15px]">{para}</p>
                ))}
              </div>
            )}

            {/* Signature */}
            {(c_aboutSignature || c_aboutFounderLabel) && (
              <div className="mt-8 flex flex-col gap-1">
                {c_aboutSignature && (
                  <span className="font-serif text-xl italic text-foreground/70">{c_aboutSignature}</span>
                )}
                {c_aboutFounderLabel && (
                  <span className="text-xs text-foreground/40 font-medium tracking-wide">{c_aboutFounderLabel}</span>
                )}
              </div>
            )}

            {/* Stats row */}
            <div className="mt-10 pt-8 border-t border-divider grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => {
                // Split on em dash to get number vs label
                const dashIdx = stat.label.indexOf(" — ");
                const num   = dashIdx > -1 ? stat.number + " — " + stat.label.slice(0, dashIdx) : stat.number;
                const label = dashIdx > -1 ? stat.label.slice(dashIdx + 3) : stat.label;
                return (
                  <div key={i}>
                    <p
                      className="font-bold text-foreground leading-none"
                      style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
                    >
                      {renderStatNumber(stat.number)}
                    </p>
                    <p className="mt-2 text-xs text-foreground/50 leading-snug">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
