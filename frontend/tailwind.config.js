// tailwind.config.js
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    animation: {
      "fade-in": "fadeIn 0.3s ease-in-out",
      "slide-up": "slideUp 0.4s ease",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      slideUp: {
        "0%": { transform: "translateY(30px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 },
      },
    },
  },
};
export const plugins = [require('tailwind-scrollbar-hide')];
