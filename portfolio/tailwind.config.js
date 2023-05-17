/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      duration: {
        2000: "2000ms",
      },
      padding: {
        xxs: "0.125rem", //8px'
        small: "0.1875rem", //12px
        regular: "0.0625rem", //16px
        medium: "0.09375rem", //24px
        large: "0.125rem", //32px
      },
      textColor: {
        offWhite: "#e4e7ec",
        offBlack: "#202328",
      },
      fontSize: {
        10: "0.625rem", //10px
        12: "0.75rem", //12px
        14: "0.875rem", //14px
        16: "1rem", //16px
        18: "1.125rem", //18px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        offWhite: "#e4e7ec",
        offBlack: "#202328",
      },
    },
  },
  plugins: [],
};
