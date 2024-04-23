/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        "neutral-200": "#d0d5dd",
        slategray: "#64748b",
        "neutral-800": "#191d23",
        black: "#344054",
        "neutrals-text-primary": "#11151f",
        "gray-500": "#667085",
        "gray-700": "#344154",
        lightgray: "#c9ced4",
        "neutral-50": "#f7f8f9",
        "neutral-400": "#a0abbb",
        "success-green-700": "#047857",
        teal: "#0b7965",
      },
      spacing: {},
      fontFamily: {
        manrope: "Manrope",
        "component-body-regular": "Inter",
      },
    },
    fontSize: {
      sm: "0.875rem",
      mini: "0.938rem",
      smi: "0.813rem",
      base: "1rem",
      lgi: "1.188rem",
      "5xl": "1.5rem",
      inherit: "inherit",
    },
    screens: {
      mq1300: {
        raw: "screen and (max-width: 1300px)",
      },
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq800: {
        raw: "screen and (max-width: 800px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
