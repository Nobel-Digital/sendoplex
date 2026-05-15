import React, { useState } from "react";
import { t } from "../i18n";
import { getRecaptchaToken } from "../utils/recaptcha";

type Status = "idle" | "sending" | "success" | "error";

interface FormValues {
  mark: string;
  mudel: string;
  aasta: string;
  labisoit: string;
  hind: string;
  info: string;
  nimi: string;
  telefon: string;
  epost: string;
}

interface FormErrors {
  mark?: string;
  mudel?: string;
  aasta?: string;
  labisoit?: string;
  nimi?: string;
  telefon?: string;
  epost?: string;
}

export interface CarOfferFormProps {
  c_carFormTitle?: string;
  c_carFormDescription?: string;
  c_carFormBullets?: string[];
  c_carFormTestimonialQuote?: string;
  c_carFormTestimonialAuthor?: string;
  c_carFormTestimonialMeta?: string;
  c_carFormEndpoint?: string;
  locale?: string;
}

const INITIAL: FormValues = { mark: "", mudel: "", aasta: "", labisoit: "", hind: "", info: "", nimi: "", telefon: "", epost: "" };

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0" aria-hidden="true">
    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
    <path d="M8 5v4m0 2.5v.01M8 1L1 14h14L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const inputClass =
  "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary";

const errorInputClass =
  "w-full rounded-md border border-red-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300";

export default function CarOfferForm({
  c_carFormTitle,
  c_carFormDescription,
  c_carFormBullets,
  c_carFormTestimonialQuote,
  c_carFormTestimonialAuthor,
  c_carFormTestimonialMeta,
  c_carFormEndpoint = "https://formcarry.com/s/eoCcqSszpYD",
  locale = "et",
}: CarOfferFormProps) {
  const tr = t(locale);
  const [v, setV] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k as keyof FormErrors]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!v.mark.trim()) e.mark = tr.carFormErrorMark;
    if (!v.mudel.trim()) e.mudel = tr.carFormErrorModel;
    const yr = Number(v.aasta);
    if (!v.aasta || yr < 1950 || yr > 2026) e.aasta = tr.carFormErrorYear;
    if (!v.labisoit) e.labisoit = tr.carFormErrorMileage;
    if (!v.nimi.trim()) e.nimi = tr.carFormErrorName;
    if (!/^[\d +()-]{6,}$/.test(v.telefon.trim())) e.telefon = tr.carFormErrorPhone;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.epost.trim())) e.epost = tr.carFormErrorEmail;
    return e;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      const firstKey = Object.keys(errs)[0];
      document.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("mark", v.mark);
      formData.append("mudel", v.mudel);
      formData.append("aasta", v.aasta);
      formData.append("labisoit", v.labisoit);
      formData.append("hind", v.hind);
      formData.append("info", v.info);
      formData.append("nimi", v.nimi);
      formData.append("telefon", v.telefon);
      formData.append("epost", v.epost);
      const recaptchaToken = await getRecaptchaToken("car_offer");
      formData.append("g-recaptcha-response", recaptchaToken);
      const res = await fetch(c_carFormEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: formData });
      const json = await res.json();
      if (json?.code === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (
    name: keyof FormValues,
    label: string,
    type: string,
    opts: { placeholder?: string; suffix?: string; optional?: boolean; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]; autoComplete?: string; rows?: number } = {}
  ) => {
    const hasErr = !!errors[name as keyof FormErrors];
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between">
          <label htmlFor={name} className="text-xs font-semibold text-foreground/80">
            {label}
            {!opts.optional && <span className="text-red-400 ml-0.5">*</span>}
          </label>
          {opts.optional && <span className="text-[11px] text-foreground/40">{tr.carFormOptional}</span>}
        </div>
        <div className="relative">
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={v[name]}
              onChange={update(name)}
              placeholder={opts.placeholder}
              rows={opts.rows ?? 3}
              className={`${hasErr ? errorInputClass : inputClass} resize-none`}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              value={v[name]}
              onChange={update(name)}
              placeholder={opts.placeholder}
              autoComplete={opts.autoComplete}
              inputMode={opts.inputMode}
              className={`${hasErr ? errorInputClass : inputClass} ${opts.suffix ? "pr-10" : ""}`}
            />
          )}
          {opts.suffix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
              {opts.suffix}
            </span>
          )}
        </div>
        {hasErr && (
          <p className="flex items-center gap-1 text-[11px] text-red-500 mt-0.5">
            <WarningIcon />
            {errors[name as keyof FormErrors]}
          </p>
        )}
      </div>
    );
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <section className="bg-background py-20 border-b border-divider" id="form">
        <div className="container mx-auto max-w-screen-xl px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left side */}
            <div className="flex-1">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                Aitäh! ✦ Saatsime ülevaate
              </span>
              <h2 className="text-section-title font-bold text-foreground leading-tight">
                Pakkumine teel <em className="font-serif not-italic text-brand-soft">su postkasti.</em>
              </h2>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Hindaja vaatab Sinu auto andmed üle ja saadab ausa pakkumise hiljemalt
                ühe tunni jooksul tööajal (E–R 9–18).
              </p>
              <ul className="mt-8 space-y-3">
                {[tr.carFormSuccess, tr.carFormSuccessBody].map((txt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary"><CheckIcon /></span>
                    <span className="text-sm text-foreground/80">{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Card */}
            <div className="lg:w-[480px] shrink-0">
              <div className="rounded-2xl border border-divider bg-white shadow-sm p-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-tint text-brand mb-6">
                  <CheckIcon />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{tr.carFormSuccess}</h3>
                <p className="text-sm text-foreground/60 mb-8">{tr.carFormSuccessBody}</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-brand text-white px-6 py-3 text-sm font-bold transition-all hover:bg-brand-soft"
                  onClick={() => { setStatus("idle"); setV(INITIAL); setErrors({}); }}
                >
                  {tr.carFormSendAnother}
                  <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Default form ──────────────────────────────────────────────────────────
  return (
    <section className="bg-background py-20 border-b border-divider" id="form">
      <div className="container mx-auto max-w-screen-xl px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left — copy + bullets + testimonial */}
          <div className="flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Pakkumise päring
            </span>
            {c_carFormTitle && (
              <h2 className="text-section-title font-bold text-foreground leading-tight">
                {c_carFormTitle}
              </h2>
            )}
            {c_carFormDescription && (
              <p className="mt-6 text-foreground/70 leading-relaxed text-sm">{c_carFormDescription}</p>
            )}

            {Array.isArray(c_carFormBullets) && c_carFormBullets.length > 0 && (
              <ul className="mt-8 space-y-3">
                {c_carFormBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-primary shrink-0"><CheckIcon /></span>
                    <span className="text-sm text-foreground/80" dangerouslySetInnerHTML={{ __html: bullet }} />
                  </li>
                ))}
              </ul>
            )}

            {c_carFormTestimonialQuote && (
              <div className="mt-10 rounded-xl border border-divider bg-brand-tint p-6">
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{c_carFormTestimonialQuote}&rdquo;
                </p>
                {(c_carFormTestimonialAuthor || c_carFormTestimonialMeta) && (
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand text-white text-xs font-bold shrink-0">
                      {c_carFormTestimonialAuthor ? c_carFormTestimonialAuthor.split(" ").map((w) => w[0]).slice(0, 2).join("") : "?"}
                    </div>
                    <div className="text-xs text-foreground/60 leading-snug">
                      <span className="font-semibold text-foreground">{c_carFormTestimonialAuthor}</span>
                      {c_carFormTestimonialMeta && <><br />{c_carFormTestimonialMeta}</>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right — form card */}
          <div className="lg:w-[480px] shrink-0">
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl border border-divider bg-white shadow-sm p-8 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{tr.carFormCarDetails}</h3>
                <span className="rounded-full bg-brand-tint text-brand text-[11px] font-semibold px-3 py-1">
                  {tr.carFormPill}
                </span>
              </div>

              {/* Car fields group */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] font-semibold tracking-widest uppercase text-foreground/40 mb-1">
                  {tr.carFormCarDetails}
                </legend>
                <div className="grid grid-cols-2 gap-4">
                  {field("mark",  tr.carFormLabelMark,  "text", { placeholder: "nt. Volkswagen" })}
                  {field("mudel", tr.carFormLabelModel, "text", { placeholder: "nt. Passat B8" })}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {field("aasta",    tr.carFormLabelYear,    "number", { placeholder: "2014", inputMode: "numeric" })}
                  {field("labisoit", tr.carFormLabelMileage, "number", { placeholder: "180 000", suffix: "km", inputMode: "numeric" })}
                  {field("hind",     tr.carFormLabelPrice,   "number", { placeholder: "8 500", suffix: "€", optional: true, inputMode: "numeric" })}
                </div>
                {field("info", tr.carFormLabelInfo, "textarea", {
                  placeholder: "Nt. teine omanik, kõik hooldused tehtud, talverehvid kaasa...",
                  optional: true,
                  rows: 3,
                })}
              </fieldset>

              {/* Contact fields group */}
              <fieldset className="flex flex-col gap-4">
                <legend className="text-[10px] font-semibold tracking-widest uppercase text-foreground/40 mb-1">
                  {tr.carFormContactDetails}
                </legend>
                {field("nimi",   tr.carFormLabelName,  "text",  { placeholder: "Mari Tamm", autoComplete: "name" })}
                <div className="grid grid-cols-2 gap-4">
                  {field("telefon", tr.carFormLabelPhone, "tel",   { placeholder: "+372 555 0000", autoComplete: "tel", inputMode: "tel" })}
                  {field("epost",   tr.carFormLabelEmail, "email", { placeholder: "mari@näide.ee", autoComplete: "email" })}
                </div>
              </fieldset>

              {/* Footer */}
              <div className="flex flex-col gap-4 pt-2 border-t border-divider">
                <p className="text-[11px] text-foreground/45 leading-relaxed">{tr.carFormConsent}</p>
                {status === "error" && (
                  <p className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
                    Viga saatmisel. Palun proovi uuesti.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-brand text-white px-6 py-3.5 text-sm font-bold transition-all hover:bg-brand-soft disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? tr.carFormSubmitting : tr.carFormSubmit}
                  {status !== "sending" && <ArrowIcon />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
