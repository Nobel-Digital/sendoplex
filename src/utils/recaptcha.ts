const SITE_KEY = "6LczPcIsAAAAAApLNObJHxo48z8MME8XOsUQp99V";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function getRecaptchaToken(action: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("reCAPTCHA not loaded"));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(SITE_KEY, { action }).then(resolve).catch(reject);
    });
  });
}
