const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        body: ["'Manrope', sans-serif"],
        display: ["'Fraunces', serif"],
        mono: ["'IBM Plex Mono', monospace"],
      },
      colors: {
        primary: colors.blue,
        dark: colors.zinc,
        canvas: '#f7f3ea',
        ink: '#1f2126',
        accent: '#9d5e2f',
        mist: '#e7decd',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
