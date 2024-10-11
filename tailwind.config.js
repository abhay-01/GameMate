/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "!./node_modules/**"],
  theme: {
    extend: {
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1'},
          '50%': { opacity: '0.2'},
        }
      },
      animation: {
        flicker: 'flicker 1.5s infinite'
      },
      colors: {
        "custom-purple": "#7F00FF",
        "custom-gray": "#191919",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, #241444 20%, #191919 40%)",
      },
    },
  },
  plugins: [],
};
