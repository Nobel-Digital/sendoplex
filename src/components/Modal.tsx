import React from "react";
import { t } from "../i18n";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  c_privacyPolicy?: { json?: { root?: RichTextNode } };
  locale?: string;
}

interface RichTextNode {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  url?: string;
  children?: RichTextNode[];
}

const renderChildren = (children: RichTextNode[] | undefined) =>
  (children || []).map((child, i) => (
    <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
  ));

const renderNode = (node: RichTextNode): React.ReactNode => {
  const { type, tag, text, children, format, url } = node;

  if (type === 'text') {
    const styles: React.CSSProperties = {};
    if (format & 1) styles.fontWeight = 'bold';
    if (format & 2) styles.fontStyle = 'italic';
    if (format & 4) styles.textDecoration = 'underline';
    return <span style={styles}>{text}</span>;
  }

  if ((type === 'link' || type === 'autolink') && url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-hover break-all">
        {renderChildren(children)}
      </a>
    );
  }

  if (tag === 'ul') return <ul className="list-disc pl-6 space-y-1">{renderChildren(children)}</ul>;
  if (tag === 'ol') return <ol className="list-decimal pl-6 space-y-1">{renderChildren(children)}</ol>;
  if (tag === 'li') return <li>{renderChildren(children)}</li>;
  if (tag === 'br') return <br />;

  const Tag = (tag || 'div') as keyof JSX.IntrinsicElements;
  return <Tag>{renderChildren(children)}</Tag>;
};

const Modal = ({ show, onClose, c_privacyPolicy, locale = "et" }: ModalProps) => {
  const tr = t(locale);
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full overflow-hidden">
      <div className="bg-white p-6 max-w-screen-lg w-full h-4/5 overflow-y-auto">
        <div className="flex flex-col justify-between relative px-6 py-6 text-slate-950">
          {c_privacyPolicy && c_privacyPolicy.json ? renderNode(c_privacyPolicy.json.root) : null}
          <button type="button" onClick={onClose} aria-label={tr.chatWidgetClose} className="text-black text-4xl absolute top-0 right-0">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
