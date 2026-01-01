/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        arabica: {
          // من ملف الهوية (RGB)
          brown: "rgb(77 31 3)",     // R77 G31 B3  :contentReference[oaicite:1]{index=1}
          deep: "rgb(42 12 6)",      // R42 G12 B6  :contentReference[oaicite:2]{index=2}
          aqua: "rgb(79 186 179)",   // R79 G186 B179 :contentReference[oaicite:3]{index=3}
          white: "rgb(255 255 255)",
          black: "rgb(0 0 0)",
        },
      },
      fontFamily: {
        // من ملف الهوية
        sukar: ["Sukar", "system-ui", "sans-serif"],          // Sukar Black/Bold/Regular :contentReference[oaicite:4]{index=4}
        coarabic: ["Co Text Arabic", "system-ui", "sans-serif"], // Co Text Arabic Bold/Regular :contentReference[oaicite:5]{index=5}
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.18)",
      },
      backdropBlur: {
        glass: "14px",
      },
    },
  },
  plugins: [],
};
