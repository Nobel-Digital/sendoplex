module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Main page background (light tint — used for most sections)
        background:         "#f9faf7",

        // Dark brand background — hero, parts section, nav
        brand:              "#1c2b1e",
        "brand-soft":       "#2a3f2d",
        "brand-tint":       "#e9ede9",

        // Navigation bar background
        navigation:         "#1c2b1e",

        // Navigation bar text color
        "navigation-text":  "#ffffff",

        // Section divider line
        divider:            "#d4d8d4",

        // Text on light background
        foreground:         "#1c2b1e",

        // Text on dark/brand backgrounds
        "foreground-dark":  "#ffffff",

        // Golden accent — buttons, links, interactive elements
        primary:            "#f3b13a",

        // Accent hover state
        "primary-hover":    "#e09f28",

        // Hero gradient overlay (start + mid)
        "hero-overlay":     "#1c2b1e",
        "hero-overlay-via": "#2a3f2d",
      },
      scale: {
        1.02: "1.02",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
        serif:  ["'Instrument Serif'", "Georgia", "Cambria", "serif"],
      },
      fontSize: {
        "section-title": ["3rem", { lineHeight: "1.1" }],
      },
    },
  },
  plugins: [],
};
