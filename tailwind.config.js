export default {
  content: [
    "./index.html",
    "./components/**/*.{jsx,tsx}",
    "./hooks/**/*.{jsx,tsx}",
    "./services/**/*.{jsx,tsx}",
    "./App.{jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#141414',
        surface: '#181818',
        primary: '#E50914',
        'primary-hover': '#b20710',
        text: '#e5e5e5',
        'text-secondary': '#b3b3b3'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}
