/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        cream: '#faf8f5',
        ink: '#0c0a09',
        accent: {
          violet: '#8b5cf6',
          fuchsia: '#c084fc',
          rose: '#f43f5e',
          amber: '#f59e0b'
        }
      },
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        'grid-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' }
        }
      },
      backgroundSize: {
        '300%': '300%',
        '400%': '400%'
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(139, 92, 246, 0.5)',
        'glow-rose': '0 0 40px -10px rgba(244, 63, 94, 0.4)',
        'inner-glow': 'inset 0 0 60px -20px rgba(139, 92, 246, 0.15)'
      }
    }
  },
  plugins: []
};
