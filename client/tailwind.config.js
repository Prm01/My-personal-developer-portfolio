/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        neon: {
          blue: '#38bdf8',
          electric: '#3b82f6',
          indigo: '#6366f1',
          purple: '#a855f7',
          violet: '#8b5cf6'
        }
      },
      boxShadow: {
        'neon-blue': '0 0 25px -4px rgba(56, 189, 248, 0.45)',
        'neon-purple': '0 0 30px -4px rgba(168, 85, 247, 0.45)',
        'neon-glow': '0 0 30px -4px rgba(59, 130, 246, 0.35), 0 0 40px -6px rgba(168, 85, 247, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  },
  plugins: []
};
