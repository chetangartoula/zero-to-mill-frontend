import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        xl: "1200px",
        lg: "960px",
        md: "720px",
        sm: "640px",
        xs: "480px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        betcard: "hsl(var(--betcard))",
        black: "hsl(var(--black))",
        secondrybetcard: "hsl(var(--secondrybetcard))",
        greenbetcard: "hsl(var(--greenbetcard))",
        greyf: "hsl(var(--greyf))",
        input: "hsl(var(--input))",
        pointinput: "hsl(var(--pointinput))",
        subinput: "hsl(var(--subinput))",
        cardtitle: "hsl(var(--cardtitle))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        disabled: {
          DEFAULT: "hsl(var(--disabled))",
          foreground: "hsl(var(--disabled-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        icon: {
          DEFAULT: "hsl(var(--icon))",
          foreground: "hsl(var(--foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        menu: {
          DEFAULT: "hsl(var(--menu))",
          foreground: "hsl(var(--menu-foreground))",
        },
        haravara: {
          DEFAULT: "hsl(var(--haravara))",
          foreground: "hsl(var(--haravara-foreground))",
        },
        navbackground: {
          DEFAULT: "hsl(var(--navbackground))",
          foreground: "hsl(var(--navbackground-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: "0",
        xs: "0.125rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      gap: {
        "11": "2.75rem",
        "12": "3rem",
        "13": "3.25rem",
        "14": "3.5rem",
        "15": "3.75rem",
        "16": "4rem",
        "17": "4.25rem",
        "18": "4.5rem",
        "19": "4.75rem",
        "20": "5rem",
        "21": "5.25rem",
        "22": "5.5rem",
        "23": "5.75rem",
        "24": "6rem",
        "25": "6.25rem",
        "26": "6.5rem",
        "27": "6.75rem",
        "28": "7rem",
        "29": "7.25rem",
        "30": "7.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      fontFamily: {
        switzer: ["Segoe UI", "Switzer", "sans-serif"],
        seoge: ["Segoe UI"],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        // 12px
        "2xs": "0.625rem", // 10px
        "3xs": "0.5rem", // 8px
      },
      height: {
        "10.5": "2.625rem", // 42px
        "11.5": "2.875rem", // 46px
        "12.5": "3.125rem", // 50px
        "13.5": "3.375rem", // 54px
        "14.5": "3.625rem", // 58px
        17: "4.25rem", // 68px
        "17.5": "4.375rem", // 70px
        18: "4.5rem", // 72px
        19: "4.75rem", // 76px
      },
      spacing: {
        "4.5": "1.125rem",
        "5": "1.25rem",
        "5.5": "1.375rem",
        "6": "1.5rem",
        "6.5": "1.625rem",
        "7": "1.75rem",
        "7.5": "1.875rem",
        "8": "2rem",
        "8.5": "2.125rem",
        "9": "2.25rem",
        "9.5": "2.375rem",
        "10": "2.5rem",
        "10.5": "2.625rem",
        "11": "2.75rem",
        "11.5": "2.875rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        "400": "400ms",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  safelist: ["dark"],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("group-hocus", [".group:hover &", ".group:focus &"]);
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".tap-highlight-transparent": {
          "-webkit-tap-highlight-color": "transparent",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
