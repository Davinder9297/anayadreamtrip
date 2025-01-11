/** @type {import('tailwindcss').Config} */
module.exports= {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        marcellus: ['Marcellus', 'sans-serif'],
      },
      screens: {
        xsm: { max: "480px" },
        sm: { min: "481px", max: "720px" },
        md: { min: "721px", max: "1024px" },
        lg: { min: "1025px", max: "1599px" },
        xl: { min: "1600px", max: "1999px" },
        "2xl": { min: "2000px" },
      },
    },
  },
  plugins: [],
};
