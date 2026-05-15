import React, { useMemo, useState } from "react";
import { t } from "../i18n";
import { getRecaptchaToken } from "../utils/recaptcha";

type Status = "idle" | "sending" | "success" | "error";

interface BasicFormProps {
  c_basicFormTitle?: string;
  c_basicFormDescription?: string;
  locale?: string;
}

export default function BasicForm({ c_basicFormTitle, c_basicFormDescription, locale = "et" }: BasicFormProps) {
  const tr = t(locale);

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gdpr, setGdpr] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isValid = useMemo(() => {
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
      formData.append("company", company);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("gdprConsent", gdpr ? "yes" : "no");

      const recaptchaToken = await getRecaptchaToken("submit");
      formData.append("g-recaptcha-response", recaptchaToken);

      const res = await fetch("https://formcarry.com/s/eoCcqSszpYD", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const json = await res.json();

      if (json?.code === 200) {
        setStatus("success");
        setFullName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setMessage("");
        setGdpr(false);
        setError("");
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

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-2xl mx-auto bg-background rounded-lg border border-slate-200 p-6 md:p-8"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">{c_basicFormTitle}</h3>
        <p className="mt-1 text-sm text-primary">{c_basicFormDescription}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            {tr.formLabelFullName} <span className="text-slate-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={tr.formPlaceholderFullName}
            autoComplete="name"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            {tr.formLabelCompany}
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={tr.formPlaceholderCompany}
            autoComplete="organization"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            {tr.formLabelEmail} <span className="text-slate-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={tr.formPlaceholderEmail}
            autoComplete="email"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            {tr.formLabelPhone}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={tr.formPlaceholderPhone}
            autoComplete="tel"
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            {tr.formLabelMessage} <span className="text-slate-500">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={tr.formPlaceholderMessage}
            rows={6}
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-primary-hover focus:border-primary-hover"
          />
        </div>
      </div>

      {/* GDPR */}
      <div className="mt-4">
        <label className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
          <input
            type="checkbox"
            checked={gdpr}
            onChange={(e) => setGdpr(e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
          />
          <span>{tr.chatFormGdpr}</span>
        </label>
      </div>

      {/* Status messages */}
      <div className="mt-4">
        {status === "success" && (
          <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {tr.formSuccess}
          </div>
        )}
        {status === "error" && error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-slate-600">
          <span className="text-slate-500">*</span> {tr.formRequired}
        </p>
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-all
            ${!isValid || status === "sending"
              ? "bg-primary text-background cursor-not-allowed"
              : "bg-primary text-background hover:bg-primary-hover"}
          `}
        >
          {status === "sending" ? tr.formSubmitting : tr.formSubmit}
        </button>
      </div>
    </form>
  );
}
