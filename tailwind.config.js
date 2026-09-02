/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        poker: ['"Cinzel Decorative"', '"Playfair Display"', 'serif'],
      },
      colors: {
        navy: {
          950: '#050914',
          900: '#0a1024',
          800: '#0f1b38',
          700: '#17274d',
        },
        card: {
          ivory: '#fbf9f4',
          cream: '#f5f0e6',
          border: '#d4af37',
          darkBg: '#12151f',
        },
        gold: {
          300: '#f6e096',
          400: '#edd06c',
          500: '#d4af37',
          600: '#aa820a',
          700: '#7e5d02',
        },
        ruby: {
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
        },
        royal: {
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        amethyst: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.25)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.45), 0 0 0 1px rgba(212, 175, 55, 0.6)',
        'card-glow-red': '0 20px 40px -10px rgba(225, 29, 72, 0.3), 0 0 20px rgba(225, 29, 72, 0.2)',
        'card-glow-blue': '0 20px 40px -10px rgba(37, 99, 235, 0.3), 0 0 20px rgba(37, 99, 235, 0.2)',
        'card-glow-green': '0 20px 40px -10px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.2)',
        'card-glow-purple': '0 20px 40px -10px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
