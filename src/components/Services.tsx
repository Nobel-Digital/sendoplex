import React, { useEffect, useMemo, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { t } from "../i18n";

export interface ServiceProps {
  c_featuredserviceTitle?: string;
  locale?: string;
  services: {
    name: string;
    description: string;
    photoGallery: { image: { url: string; width?: number; height?: number } }[];
    c_serviceDetailedDescription: { json: RichTextJson };
    c_mainServicePhoto: { image: { url: string } };
    c_documentUpload?: { url: string };
    c_downloadButtonLabel?: string;
  }[];
}

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

const FORMAT = {
  BOLD: 1,
  ITALIC: 2,
  UNDERLINE: 4,
  STRIKETHROUGH: 8,
};

function hasFormat(node: TextNode, flag: number) {
  const f = typeof node?.format === "number" ? node.format : 0;
  return (f & flag) === flag;
}

function renderTextNode(node: TextNode, key: React.Key) {
  let content: React.ReactNode = node?.text ?? "";

  if (hasFormat(node, FORMAT.BOLD)) content = <strong>{content}</strong>;
  if (hasFormat(node, FORMAT.ITALIC)) content = <em>{content}</em>;
  if (hasFormat(node, FORMAT.UNDERLINE))
    content = <span className="underline">{content}</span>;
  if (hasFormat(node, FORMAT.STRIKETHROUGH))
    content = <span className="line-through">{content}</span>;

  if (node?.type === "linebreak") return <br key={key} />;

  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function getImageFromNode(
  node: ImageNode
): { url: string; width?: number; height?: number; alt?: string } | null {
  const url =
    node?.src || node?.url || node?.image?.url ||
    node?.fields?.image?.url || node?.fields?.asset?.url ||
    node?.fields?.file?.url || node?.fields?.media?.url;

  if (!url || typeof url !== "string") return null;

  const width = node?.width || node?.image?.width || node?.fields?.image?.width ||
    node?.fields?.asset?.width || node?.fields?.file?.width;

  const height = node?.height || node?.image?.height || node?.fields?.image?.height ||
    node?.fields?.asset?.height || node?.fields?.file?.height;

  const alt = node?.alt || node?.title || node?.fields?.alt || node?.fields?.title || "Image";

  return { url, width, height, alt };
}

function renderChildren(children: RichTextNode[] = [], ctx?: { inTableCell?: boolean; tr?: ReturnType<typeof t> }) {
  return children.map((child, idx) => renderNode(child, idx, ctx));
}

function renderNode(
  node: RichTextNode,
  key: React.Key,
  ctx: { inTableCell?: boolean; tr?: ReturnType<typeof t> } = {}
): React.ReactNode {
  if (!node) return null;

  if (node.type === "text") return renderTextNode(node, key);

  if (node.type === "image" || node.type === "upload" || node.type === "media" || node.type === "asset") {
    const img = getImageFromNode(node);
    if (!img) return null;
    const w = img.width || 1400;
    const h = img.height || 900;
    return (
      <span key={key} className="inline-flex max-w-full">
        <Item original={img.url} thumbnail={img.url} width={w} height={h} title={img.alt}>
          {({ ref, open }) => (
            <button type="button" onClick={open} className="inline-flex items-start leading-none" aria-label="Open image">
              <img
                ref={ref as any} src={img.url} alt={img.alt} loading="lazy"
                className="block w-[72px] sm:w-[84px] max-h-[40px] sm:max-h-[44px] h-auto rounded border border-slate-200 bg-white object-contain cursor-zoom-in hover:opacity-90 transition-opacity"
              />
            </button>
          )}
        </Item>
      </span>
    );
  }

  if (node.type === "link") {
    const url = node?.url || node?.fields?.url || "#";
    return (
      <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 break-words">
        {renderChildren(node.children, ctx)}
      </a>
    );
  }

  if (node.type === "paragraph") {
    const mb = ctx.inTableCell ? "mb-0" : "mb-4";
    return <p key={key} className={`${mb} leading-relaxed text-slate-700`}>{renderChildren(node.children, ctx)}</p>;
  }

  if (node.type === "heading") {
    const tag: string = node?.tag || (typeof node?.format === "string" ? node.format : "");
    const level = tag?.startsWith("h") ? tag : `h${node?.format || 2}`;
    const base = "mt-6 mb-3 font-semibold text-slate-950";
    if (level === "h1") return <h1 key={key} className={`${base} text-2xl`}>{renderChildren(node.children, ctx)}</h1>;
    if (level === "h2") return <h2 key={key} className={`${base} text-xl`}>{renderChildren(node.children, ctx)}</h2>;
    if (level === "h3") return <h3 key={key} className={`${base} text-lg`}>{renderChildren(node.children, ctx)}</h3>;
    return <h4 key={key} className={`${base} text-base`}>{renderChildren(node.children, ctx)}</h4>;
  }

  if (node.type === "list") {
    const isBullet = node?.listType === "bullet";
    const ListTag = isBullet ? "ul" : "ol";
    return (
      <ListTag key={key} className={`${isBullet ? "list-disc" : "list-decimal"} pl-6 mb-4 space-y-2 text-slate-700`}>
        {renderChildren(node.children, ctx)}
      </ListTag>
    );
  }

  if (node.type === "listitem") return <li key={key}>{renderChildren(node.children, ctx)}</li>;

  if (node.type === "horizontalrule") return <hr key={key} className="my-6 border-slate-200" />;

  if (node.type === "table") {
    return (
      <div key={key} className="my-6">
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-[640px] w-full text-left text-sm">
            <tbody>{renderChildren(node.children, ctx)}</tbody>
          </table>
        </div>
        {ctx.tr && (
          <p className="mt-2 text-xs text-slate-500">{ctx.tr.servicesTableHint}</p>
        )}
      </div>
    );
  }

  if (node.type === "tablerow") {
    return (
      <tr key={key} className="border-b last:border-b-0 border-slate-200">
        {renderChildren(node.children, ctx)}
      </tr>
    );
  }

  if (node.type === "tablecell") {
    const isHeader = node?.headerState === 1 || node?.isHeader === true;
    const CellTag = (isHeader ? "th" : "td") as "th" | "td";
    return (
      <CellTag key={key} className={`align-top px-3 py-2 border-r last:border-r-0 border-slate-200 ${isHeader ? "bg-slate-50 font-semibold text-slate-950" : "text-slate-700"}`}>
        <div className="min-w-[100px]">{renderChildren(node.children, { ...ctx, inTableCell: true })}</div>
      </CellTag>
    );
  }

  if (Array.isArray(node.children)) {
    return <React.Fragment key={key}>{renderChildren(node.children, ctx)}</React.Fragment>;
  }

  return null;
}

function extractPlainText(children: RichTextNode[]): string {
  return children.flatMap((node) => {
    if (node.type === "text") return node.text ?? "";
    if (Array.isArray(node.children)) return extractPlainText(node.children);
    return "";
  }).join("");
}

const RichText: React.FC<{ json: RichTextJson; tr: ReturnType<typeof t> }> = ({ json, tr }) => {
  const nodes = useMemo(() => {
    const rootChildren = json?.root?.children;
    return Array.isArray(rootChildren) ? rootChildren : [];
  }, [json]);

  if (!nodes.length) return null;

  return (
    <div className="mt-6">
      <Gallery>
        <div className="text-slate-800 leading-relaxed">
          {nodes.map((n, i) => renderNode(n, i, { tr }))}
        </div>
      </Gallery>
    </div>
  );
};

const ServicesList: React.FC<ServiceProps> = ({ services, c_featuredserviceTitle, locale = "et" }) => {
  const tr = t(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-chat-widget="true"]')) return;
      if (
        target.closest(".pswp") || target.closest(".pswp__button") ||
        target.closest(".pswp__ui") || target.closest(".pswp__bg") ||
        target.closest(".pswp__scroll-wrap")
      ) return;
      const productsSection = document.getElementById("tooted");
      if (!productsSection) return;
      if (!productsSection.contains(target)) setOpenIndex(null);
    }
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section id="tooted" className="scroll-mt-24 bg-background py-20 border-b border-divider px-6 md:px-10">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-section-title text-foreground pt-3 pb-12 text-center font-bold">{c_featuredserviceTitle}</h2>
        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
              tr={tr}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{
  service: ServiceProps["services"][0];
  isOpen: boolean;
  onToggle: () => void;
  tr: ReturnType<typeof t>;
}> = ({ service, isOpen, onToggle, tr }) => {
  const hasImage = Boolean(service.c_mainServicePhoto?.image?.url);

  const richChildren = service.c_serviceDetailedDescription?.json?.root?.children;
  const previewText = richChildren ? extractPlainText(richChildren).slice(0, 100) : "";
  const hasMore = richChildren ? extractPlainText(richChildren).length > 100 : false;

  return (
    <article
      className="bg-white w-full rounded-lg shadow-md border border-slate-200 overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <header className="flex items-start justify-between gap-4">
              <h3 className="text-xl text-slate-950 font-semibold leading-tight">{service.name}</h3>
            </header>
            {previewText && !isOpen ? (
              <p className="text-sm text-slate-500 mt-3">{previewText}{hasMore ? "..." : ""}</p>
            ) : null}
            {isOpen && richChildren && (
              <div className="text-sm text-slate-700 mt-3">
                {richChildren.map((n, i) => renderNode(n, i, { tr }))}
              </div>
            )}
            <div className="mt-5 flex items-center justify-start gap-3">
              <button
                onClick={onToggle}
                className="bg-primary text-background px-4 py-2 rounded-md text-sm font-semibold transition-all hover:bg-primary-hover"
                aria-expanded={isOpen}
              >
                {isOpen ? tr.servicesHideDetails : tr.servicesShowMore}
              </button>
            </div>
          </div>
          {hasImage ? (
            <div className="md:shrink-0 md:self-start w-full md:w-[200px] lg:w-[220px]">
              <div className="w-full aspect-[4/3] bg-slate-100 rounded-md overflow-hidden border border-slate-200">
                <img src={service.c_mainServicePhoto.image.url} alt={service.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          ) : null}
        </div>

        {isOpen && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            {service.photoGallery?.length > 0 && (
              <div className="mb-6">
                <Gallery>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {service.photoGallery.map((photo, photoIndex) => (
                      <Item
                        key={photoIndex}
                        original={photo.image.url}
                        thumbnail={photo.image.url}
                        width={photo.image.width || 1200}
                        height={photo.image.height || 800}
                        title={service.name}
                      >
                        {({ ref, open }) => (
                          <button
                            type="button"
                            onClick={open}
                            className="w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                            aria-label={`Open ${service.name} photo ${photoIndex + 1} fullscreen`}
                          >
                            <img
                              ref={ref as any}
                              src={photo.image.url}
                              alt={`${service.name} photo ${photoIndex + 1}`}
                              className="w-full aspect-[4/3] object-cover hover:opacity-80 transition-opacity rounded-md border border-slate-200"
                              loading="lazy"
                            />
                          </button>
                        )}
                      </Item>
                    ))}
                  </div>
                </Gallery>
              </div>
            )}
            {service.c_serviceDetailedDescription?.json && !richChildren && (
              <RichText json={service.c_serviceDetailedDescription.json} tr={tr} />
            )}
            {service.c_documentUpload?.url && service.c_downloadButtonLabel && (
              <div className="mt-6">
                <a
                  href={service.c_documentUpload.url}
                  download
                  className="inline-block bg-primary text-background px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-hover transition-all"
                >
                  {service.c_downloadButtonLabel}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ServicesList;
