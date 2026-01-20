import type { Config } from "tailwindcss";

/**
 * Tailwind configuration for the web app.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

