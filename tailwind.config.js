/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--brand-50, #f0fdfa)',
          100: 'var(--brand-100, #ccfbf1)',
          200: 'var(--brand-200, #99f6e4)',
          300: 'var(--brand-300, #5eead4)',
          400: 'var(--brand-400, #2dd4bf)',
          500: 'var(--brand-500, #0d9488)',
          600: 'var(--brand-600, #0f766e)',
          700: 'var(--brand-700, #115e59)',
          800: 'var(--brand-800, #134e4a)',
          900: 'var(--brand-900, #042f2e)',
        },
        accent: {
          cyan: '#06b6d4',
          teal: '#14b8a6',
          emerald: '#10b981',
          blue: '#3b82f6',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['var(--font-family, Plus Jakarta Sans)', 'sans-serif'],
        display: ['var(--font-display, Outfit)', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 35px -5px rgba(20, 184, 166, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'card-hover': '0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 0 1px 1px rgba(148, 163, 184, 0.1)',
        'premium': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
