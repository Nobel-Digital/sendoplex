import * as React from "react";

export interface WhatSectionProps {
  c_simpleServicesproductsTitle?: string;
  items?: {
    name: string;
    richTextDescriptionV2?: {
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
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-hover">
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
      <p className="mb-4 leading-relaxed">
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

  if (type === "table" || tag === "table") {
    return (
      <div className="my-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <tbody>
            {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "tableRow" || type === "tablerow" || tag === "tr") {
    return (
      <tr className="border-b last:border-b-0">
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </tr>
    );
  }

  if (type === "tableCell" || type === "tablecell" || tag === "td" || tag === "th") {
    const isHeader = tag === "th" || node.header === true || headerState === 1;
    const CellTag = (isHeader ? "th" : "td") as "th" | "td";
    return (
      <CellTag className={"px-3 py-2 align-top border " + (isHeader ? "font-semibold" : "font-normal")} colSpan={colSpan} rowSpan={rowSpan}>
        {safeChildren.map((child, i) => <React.Fragment key={i}>{renderNode(child)}</React.Fragment>)}
      </CellTag>
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
const WhatSection = ({ items, c_simpleServicesproductsTitle }: WhatSectionProps) => {
  if (!items || items.length === 0) return null;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="teenused"
      className="flex bg-background mx-auto justify-center py-40 border-b border-divider px-6 md:px-10 sm:px-6"
    >
      <div className="container w-full text-center max-w-screen-xl">
        <h2 className="text-section-title font-bold text-left md:text-center mb-10 text-foreground">
          {c_simpleServicesproductsTitle}
        </h2>
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            <button
              className="faq-button w-full py-3 flex justify-between items-center border-b border-neutral-600"
              onClick={() => toggleFaq(index)}
            >
              <span className="text-xl text-left text-foreground">{item.name}</span>
              <span className="toggle-btn text-3xl text-foreground">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            {activeIndex === index && (
              <div className="faq-content mb-4">
                <ul className="flex flex-col text-left">
                  {item.richTextDescriptionV2?.json?.root?.children && (
                    <li className="text-foreground text-lg font-light border-b border-slate-200 py-3 px-5">
                      {item.richTextDescriptionV2.json.root.children.map((child: any, idx: number) => (
                        <React.Fragment key={idx}>{renderNode(child)}</React.Fragment>
                      ))}
                    </li>
                  )}
                </ul>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default WhatSection;
