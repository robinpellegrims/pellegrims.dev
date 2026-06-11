/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        body: ["'Archivo', sans-serif"],
        display: ["'Cormorant Garamond', serif"],
        mono: ["'JetBrains Mono', monospace"],
      },
      colors: {
        canvas: '#09090b',
        surface: '#141419',
        'surface-bright': '#1c1c24',
        ink: '#e8e4dd',
        'ink-muted': '#7a7670',
        accent: '#c9913c',
        'accent-bright': '#e8b866',
        mist: '#1e1e26',
      },
      borderColor: {
        DEFAULT: 'rgba(255, 255, 255, 0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out both',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#e8e4dd',
            '--tw-prose-headings': '#e8e4dd',
            '--tw-prose-lead': '#b0aca5',
            '--tw-prose-links': '#c9913c',
            '--tw-prose-bold': '#e8e4dd',
            '--tw-prose-counters': '#7a7670',
            '--tw-prose-bullets': '#7a7670',
            '--tw-prose-hr': 'rgba(255, 255, 255, 0.06)',
            '--tw-prose-quotes': '#b0aca5',
            '--tw-prose-quote-borders': 'rgba(201, 145, 60, 0.4)',
            '--tw-prose-captions': '#7a7670',
            '--tw-prose-code': '#e8b866',
            '--tw-prose-pre-code': '#e8e4dd',
            '--tw-prose-pre-bg': '#141419',
            '--tw-prose-th-borders': 'rgba(255, 255, 255, 0.1)',
            '--tw-prose-td-borders': 'rgba(255, 255, 255, 0.06)',
            color: 'var(--tw-prose-body)',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
