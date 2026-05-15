import * as React from "react";

export interface WhySectionProps {
  c_whySectionTitle?: string;
  c_whyItems?: {
    name: string;
    c_whyDetailedDescription?: {
      json?: {
        root?: { children?: any[] };
      };
    };
  }[];
}

// --- RICHTEXT RENDERER ---
const renderNode = (node: any): React.ReactNode => {
  if (!node || typeof node !== "object") return null;

  const { type, tag, text, children, format, listType, url, colSpan, rowSpan, headerState } = node;
  const safeChildren = Array.isArray(children) ? children : [];

  if (type === "text") {
    const styles: React.CSSProperties = {};
    if (format & 1) styles.fontWeight = "bold";
    if (format & 2) styles.fontStyle = "italic";
    if (format & 4) styles.textDecoration = "underline";
    return <span style={styles}>{text}</span>;
  }

  if (type === "link" && url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </a>
    );
  }

  if (type === "list") {
    const ListTag = listType === "bullet" ? "ul" : "ol";
    return (
      <ListTag className={listType === "bullet" ? "list-disc list-inside mb-4" : "list-decimal list-inside mb-4"}>
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </ListTag>
    );
  }

  if (type === "listitem" || tag === "li") {
    return (
      <li className="mb-2">
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </li>
    );
  }

  if (tag === "br") return <br />;

  if (type === "paragraph" || tag === "p") {
    if (!safeChildren.length) return <div className="h-4" />;
    return (
      <p className="mb-8 font-light leading-6">
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </p>
    );
  }

  if (type === "heading" && tag) {
    const HeadingTag = tag as keyof JSX.IntrinsicElements;
    return (
      <HeadingTag className="mb-4 font-bold text-xl">
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </HeadingTag>
    );
  }

  const Tag = tag || "div";
  return (
    <Tag className="mb-4">
      {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
    </Tag>
  );
};

// --- COMPONENT ---
const WhySection = ({ c_whySectionTitle, c_whyItems }: WhySectionProps) => {
  if (!c_whyItems || c_whyItems.length === 0) return null;

  return (
    <section
      id="miks"
      className="bg-background py-20 border-b border-divider px-6 md:px-10"
    >
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-section-title font-bold md:text-center mb-10 text-foreground">
          {c_whySectionTitle}
        </h2>
        <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {c_whyItems.map((item, index) => (
            <div key={index}>
              <h3 className="text-foreground text-3xl py-4 font-semibold">{item.name}</h3>
              {item.c_whyDetailedDescription?.json?.root?.children && (
                <div className="text-foreground">
                  {item.c_whyDetailedDescription.json.root.children.map((child: any, idx: number) => (
                    <React.Fragment key={idx}>{renderNode(child)}</React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
