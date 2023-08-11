/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#B061B2',
        customLightColor: '#EECAFA'
      },
    },
  },
  plugins: [],
}
