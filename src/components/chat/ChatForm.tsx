import * as React from "react";
import { t } from "../../i18n";
import { getRecaptchaToken } from "../../utils/recaptcha";

type Status = "idle" | "sending" | "success" | "error";

interface ChatFormProps {
  messagePrefill?: string;
  onSuccess?: () => void;
  locale?: string;
}

const ChatForm: React.FC<ChatFormProps> = ({
  messagePrefill,
  onSuccess,
  locale = "et",
}) => {
  const tr = t(locale);

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState(messagePrefill ?? "");
  const [gdpr, setGdpr] = React.useState(false);

  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (messagePrefill) {
      setMessage(messagePrefill);
    }
  }, [messagePrefill]);

  const isValid = React.useMemo(() => {
    const emailOk = /\S+@\S+\.\S+/.test(email.trim());
    return (
      fullName.trim().length >= 2 &&
      emailOk &&
      message.trim().length >= 5 &&
      gdpr
    );
  }, [fullName, email, message, gdpr]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    e.stopPropagation();

    setError("");
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("gdprConsent", gdpr ? "yes" : "no");

      const recaptchaToken = await getRecaptchaToken("submit");
      formData.append("g-recaptcha-response", recaptchaToken);

      const res = await fetch("https://formcarry.com/s/RYFFJQRIoFE", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const json = await res.json();

      if (json?.code === 200) {
        setStatus("success");
        setFullName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setGdpr(false);
        onSuccess?.();
      } else if (json?.code === 422) {
        setStatus("error");
        setError(tr.formErrorValidation);
      } else {
        setStatus("error");
        setError(tr.formErrorGeneral);
      }
    } catch {
      setStatus("error");
      setError(tr.formErrorRetry);
    }
  }

  const inputClass =
    "w-full rounded-md border border-white/30 bg-primary px-4 py-3 text-background placeholder:text-background focus:outline-none focus:ring-2 focus:ring-white/60";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={tr.chatFormPlaceholderName}
          autoComplete="name"
          className={inputClass}
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={tr.chatFormPlaceholderPhone}
          autoComplete="tel"
          className={inputClass}
        />

        <div className="md:col-span-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tr.chatFormPlaceholderEmail}
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={tr.chatFormPlaceholderMessage}
            rows={6}
            className={inputClass}
          />
        </div>
      </div>

      {/* GDPR */}
      <div className="mt-4 text-background">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="mt-1 h-5 w-5"
          />
          <span>{tr.chatFormGdpr}</span>
        </label>
      </div>

      {/* Status */}
      <div className="mt-4">
        {status === "success" && (
          <div className="rounded-md bg-white px-4 py-3 text-sm text-green-700 font-semibold">
            {tr.formSuccess}
          </div>
        )}
        {status === "error" && error && (
          <div className="rounded-md bg-white px-4 py-3 text-sm text-red-700 font-semibold">
            {error}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-background">* {tr.formRequired}</div>
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className={`rounded-md px-6 py-3 text-sm font-semibold transition ${
            !isValid || status === "sending"
              ? "bg-primary/30 text-background/70 cursor-not-allowed"
              : "bg-primary text-background hover:opacity-90"
          }`}
        >
          {status === "sending" ? tr.formSubmitting : tr.formSubmit}
        </button>
      </div>
    </form>
  );
};

export default ChatForm;
