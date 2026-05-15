import * as React from "react";
import ChatForm from "./ChatForm";
import { CHAT_OPEN_EVENT, CHAT_CLOSE_EVENT } from "./chatEvents";
import { t } from "../../i18n";

interface ChatWidgetProps {
  locale?: string;
  c_basicFormTitle?: string;
  c_basicFormDescription?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  locale = "et",
  c_basicFormTitle,
  c_basicFormDescription,
}) => {
  const tr = t(locale);
  const [isOpen, setIsOpen] = React.useState(false);
  const [prefill, setPrefill] = React.useState<string>("");
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  const open = React.useCallback((messagePrefill?: string) => {
    setPrefill(messagePrefill ?? "");
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    function handleOpen(e: Event) {
      const ce = e as CustomEvent<{ messagePrefill?: string }>;
      open(ce.detail?.messagePrefill);
    }
    function handleClose() {
      close();
    }
    window.addEventListener(CHAT_OPEN_EVENT, handleOpen);
    window.addEventListener(CHAT_CLOSE_EVENT, handleClose);
    return () => {
      window.removeEventListener(CHAT_OPEN_EVENT, handleOpen);
      window.removeEventListener(CHAT_CLOSE_EVENT, handleClose);
    };
  }, [open, close]);

  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!isOpen) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, close]);

  return (
    <>
      {/* Floating Button */}
      <div
        data-chat-widget="true"
        className="fixed z-[9999] right-4 bottom-4 md:right-8 md:bottom-8"
      >
        <button
          onClick={() => open()}
          className="h-16 w-16 rounded-2xl bg-primary text-background shadow-lg flex items-center justify-center hover:opacity-95 transition-transform hover:scale-105"
          aria-label={tr.chatWidgetOpen}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16v12H4V6zm0 0l8 6 8-6"
            />
          </svg>
        </button>
      </div>

      {/* Slide Panel */}
      <div
        data-chat-widget="true"
        className={`fixed z-[9999] right-0 bottom-0 md:bottom-6 md:right-6 w-full md:w-[520px] transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full md:translate-y-[120%]"
        }`}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={c_basicFormTitle}
          className="rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="bg-foreground px-5 py-4 flex justify-between items-center text-background">
            <div>
              <div className="font-semibold text-lg">{c_basicFormTitle}</div>
              <div className="text-sm opacity-90">{c_basicFormDescription}</div>
            </div>
            <button
              onClick={close}
              className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"
              type="button"
              aria-label={tr.chatWidgetClose}
            >
              ✕
            </button>
          </div>
          <div className="bg-foreground px-5 py-5">
            <ChatForm
              messagePrefill={prefill}
              locale={locale}
              onSuccess={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
