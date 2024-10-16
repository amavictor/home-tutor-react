/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "m2xl": { max: "1440px" },
      mxl: { max: "1279px" },
      mlg: { max: "1024px" },
      mmlg: { max: "977px" },
      mmd: { max: "768px" },
      msm: { max: "640px" },
      mxs: { max: "480px" },
      mxxs: { max: "425px" },
      mxxss: { max: "375px" },
      mxxssw: { max: "355px" },
      mxxxs: { max: "320px" },
      "ms-height": { raw: "(max-height: 700px)" },
      "mxl-height": { raw: "(max-height: 850px)" },
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        green: "var(--green)",
        black: "var(--black)",
        purple: "var(--purple)",
        teal: "var(--teal)",
        "light-green": "var(--light-green)",
        white: "var(--white)",
        gray: "var(--gray)",
      },
      borderRadius: {
        'custom-sm-12': '0.75rem', //12px
        'custom-md-22': '1.375rem' //22px
      },
      fontSize: {
        //These are my Headings element styles (h1 - h6), if a style guide existing, This is a better option
        "h-xxl": ["3rem", { lineHeight: "48px", fontWeight: 800 }],
        "h-xl": ["2rem", { lineHeight: "40px", fontWeight: 800 }],
        "h-l": ["1.5rem", { lineHeight: "24px", fontWeight: 800 }],
        "h-m": ["1.1875rem", { lineHeight: "24px", fontWeight: 800 }],
        "h-s": ["1rem", { lineHeight: "24px", fontWeight: 800 }],
        "h-xs": [".75rem", { lineHeight: "15.96px", fontWeight: 800 }],

        //These are my Paragraph element styles
        "p-xxl": ["1.5rem", { lineHeight: "32px", fontWeight: 400 }],
        "p-xl": ["1.1875rem", { lineHeight: "28px", fontWeight: 400 }],
        "p-l": ["1rem", { lineHeight: "16px", fontWeight: 400 }],
        "p-m": ["0.875rem", { lineHeight: "20.02px", fontWeight: 400 }],
        "p-s": ["0.75rem", { lineHeight: "15.96px", fontWeight: 400 }],
      },
      keyframes: {
        moveLine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        moveLine: 'moveLine 1s linear infinite',
      },
    },
  },
  plugins: [],
}

