/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tungsten: ['tungsten', 'sans-serif'],
        valorant: ['valorant','sans-serif']
      },
      backgroundImage: {

        'logo': "url('./assets/images/valorantLogo.jpg')",

        'play': "url('/src/assets/images/valorantBackgroundStart.jpg')",

        'start': "url('/src/assets/images/valorantBackground.jpg')",

        'end': "url('/src/assets/images/valorantBackgroundEnd.jpg')",
       }
    },
  },
  plugins: [],
}

