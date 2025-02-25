/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Flex", "sans-serif"],
      },
      fontSize: {
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }], // 40px
        h2: ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],   // 32px
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "500" }], // 28px
        h4: ["1.25rem", { lineHeight: "1.5", fontWeight: "500" }], // 24px
        p: ["1.0rem", { lineHeight: "1.6", fontWeight: "400" }],    // 16px
        small: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }], // 14px
      },
    },
  },
  plugins: [],
}

