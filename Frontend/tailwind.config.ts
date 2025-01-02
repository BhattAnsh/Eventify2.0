import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA', // light background for cleanliness and readability
        foreground: '#1F2937', // dark text for contrast
        primary: {
          DEFAULT: '#4F46E5', // indigo for primary actions and highlights
          foreground: '#FFFFFF', // white text for buttons on primary color
        },
        secondary: {
          DEFAULT: '#14B8A6', // teal for secondary actions and positive states
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F59E0B', // gold accent for calls-to-action and highlights
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#9CA3AF', // muted gray for secondary text
          foreground: '#D1D5DB', // lighter muted color
        },
        border: '#E5E7EB', // soft border color
        ring: '#4F46E5', // focus rings in primary indigo
        card: {
          DEFAULT: '#FFFFFF', // white card background
          foreground: '#1F2937', // dark text for readability
        },
        destructive: {
          DEFAULT: '#DC2626', // red for warning or destructive actions
          foreground: '#FFFFFF',
        },
        input: '#E5E7EB', // light background for input fields
        chart: {
          '1': '#4F46E5', // colors to match the theme for charts and graphs
          '2': '#14B8A6',
          '3': '#F59E0B',
          '4': '#DC2626',
          '5': '#9CA3AF',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;