import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./app/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clerk: {
          primary: "var(--clerk-color-primary)",
          foreground: "var(--clerk-color-foreground)",
          background: "var(--clerk-color-background)",
          input: "var(--clerk-color-input)",
          danger: "var(--clerk-color-danger)",
          success: "var(--clerk-color-success)",
        },
      },
      borderRadius: {
        clerk: "var(--clerk-border-radius)",
      },
    },
  },
};
export default config;   
