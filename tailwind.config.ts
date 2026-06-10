import type { Config } from "tailwindcss";

/**
 * PC-STYLE - Tema: e zezë / e bardhë / blu elektrike
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta kryesore e brendit
        ink: "#06080F",        // sfondi kryesor (pothuajse i zi)
        carbon: "#0C1018",     // sfond kartelash
        steel: "#161D2B",      // kufij / sipërfaqe sekondare
        electric: "#1F6BFF",   // blu elektrike - ngjyra e brendit
        volt: "#4D9FFF",       // blu më e ndritshme për hover/glow
        frost: "#EAF2FF",      // tekst kryesor (e bardhë me nuancë blu)
        mist: "#8DA2C0",       // tekst sekondar
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(31,107,255,.35)",
        "glow-sm": "0 0 12px rgba(31,107,255,.25)",
      },
      backgroundImage: {
        "circuit": "linear-gradient(rgba(31,107,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(31,107,255,.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseGlow: { "0%,100%": { boxShadow: "0 0 12px rgba(31,107,255,.25)" }, "50%": { boxShadow: "0 0 28px rgba(31,107,255,.5)" } },
      },
      animation: {
        "fade-up": "fade-up .5s ease-out both",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
