/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lfgYellow: '#FFD447',
        lfgTeal: '#4FF2C9',
        lfgPink: '#FF4FA3'
      },
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glass: '0 18px 45px rgba(0,0,0,0.65)'
      }
    }
  },
  plugins: []
};