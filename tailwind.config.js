/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/*.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        brandColor: {

          "primary": "#4D869C",

          "secondary": "#7AB2B2",

          "accent": "#6ee7b7",

          "neutral": "#CDE8E5",

          "base-100": "#EEF7FF",

          "info": "#0000ff",

          "success": "#4ade80",

          "warning": "#facc15",

          "error": "#fb7185",
        },
      },
    ],
  },
}