/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          primary: '#1e40af', // Azul heroico
          secondary: '#dc2626', // Vermelho de ação
          accent: '#f59e0b', // Dourado
          dark: '#1f2937',
          light: '#f8fafc'
        },
        values: {
          agility: '#10b981', // Verde
          enchantment: '#8b5cf6', // Roxo
          efficiency: '#f59e0b', // Laranja
          excellence: '#ef4444', // Vermelho
          transparency: '#06b6d4', // Ciano
          ambition: '#f97316' // Laranja escuro
        }
      },
      fontFamily: {
        'hero': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
