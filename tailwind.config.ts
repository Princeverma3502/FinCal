import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          indigo: "#6366F1",
          emerald: "#10B981",
        }
      },
      borderRadius: {
        'fintech': '1.25rem', // Extra rounded for that modern look
      }
    },
  },
  plugins: [],
};
export default config;