/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light", 
      "dark",
      {
        custom: {
          "primary": "#2C5282",     // Dark blue - military inspired
          "secondary": "#718096",   // Slate gray
          "accent": "#4299E1",      // Bright blue for highlights
          "neutral": "#1A365D",     // Navy blue for neutral/footer
          "base-100": "#ffffff",    // White
          "base-200": "#EDF2F7",    // Light gray blue
          "base-300": "#E2E8F0",    // Slightly darker gray blue
          "info": "#63B3ED",        // Info blue
          "success": "#48BB78",     // Success green
          "warning": "#F6AD55",     // Warning orange
          "error": "#F56565",       // Error red
        },
      },
    ],
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
}