/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: '#3490dc',
        secondary: '#41b883',
        danger: '#e3342f',
      },
      spacing: {
        // Define your custom spacing here
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
        '40px': '40px',
        '50px': '50px',
      },
      fontFamily: {
        // Define your custom font families here
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}

