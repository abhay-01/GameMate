/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#7F00FF',
        'custom-gray' : '#191919',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #241444 20%, #191919 40%)',
      },
    },
  },
  plugins: [],
}

