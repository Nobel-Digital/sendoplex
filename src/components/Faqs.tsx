import * as React from "react";
export interface FaqsProps {
  c_faqTitle: string;
  faqs: {
    name: string;
    c_faqContent: string;
    c_descriptionList?: { json: any };
  }[];
}
// Function to render rich text content
const renderNode = (node: any): React.ReactNode => {
  const { type, tag, text, children, url, format } = node;
  if (type === "text") {
    let content = text;
    if (format & 1) content = <strong>{text}</strong>;
    if (format & 2) content = <em>{text}</em>;
    if (format & 4) content = <u>{text}</u>;
    return content;
  }
  if (type === "link" && url) {
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http")) {
      formattedUrl = `https://${formattedUrl}`;
    }
    return (
      <a
        href={formattedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline"
      >
        {children?.map(renderNode) || text}
      </a>
    );
  }
  if (tag === "ul") {
    return (
      <ul className="list-disc pl-6 mb-4 text-foreground">
        {children?.map((childNode, index) => (
          <li key={index} className="mb-1">
            {renderNode(childNode)}
          </li>
        ))}
      </ul>
    );
  }
  if (tag === "ol") {
    return (
      <ol className="list-decimal pl-6 mb-4 text-foreground">
        {children?.map((childNode, index) => (
          <li key={index} className="mb-1">
            {renderNode(childNode)}
          </li>
        ))}
      </ol>
    );
  }
  const Tag = tag || "div";
  return <Tag>{children?.map(renderNode)}</Tag>;
};
const FaqsList: React.FC<FaqsProps> = ({ c_faqTitle, faqs }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section
      id="korduma-kippuvad-kusimused"
      className="bg-background py-20 px-6 md:px-10 scroll-mt-24"
    >
      <div className="container mx-auto max-w-screen-lg">
        <h2 className="text-section-title font-bold mb-10 text-foreground">
          {c_faqTitle}
        </h2>
        <div className="divide-y divide-divider">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${index}`}
                  className="w-full flex justify-between items-center text-xl font-bold tracking-wide text-foreground cursor-pointer py-3 hover:text-primary transition-colors"
                >
                  {faq.name}
                  <span className={`text-foreground text-2xl font-bold transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  id={`faq-content-${index}`}
                  role="region"
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out text-primary text-sm ${isOpen ? "max-h-[1000px]" : "max-h-0"}`}
                >
                  {faq.c_descriptionList?.json?.root &&
                    renderNode(faq.c_descriptionList.json.root)}
                  <p className="mt-2">{faq.c_faqContent}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FaqsList;
