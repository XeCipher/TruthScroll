/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        truth: {
          bg: '#F7F8FC',
          text: '#121212',
          blue: '#0057FF',
          green: '#00B87D',
          red: '#D92D20',
          yellow: '#FFC107',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
