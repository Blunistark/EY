/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // OEM Control Center - Business/Operational Dark Theme
        oem: {
          black: '#050508',
          'dark-gray': '#0c0d12',
          'medium-gray': '#14161e',
          'light-gray': '#1e2130',
          'border': '#262a3d',
          'text-muted': '#7c8299',
          'text-secondary': '#a8b0cc',
          white: '#ffffff',
        },
        // Electric Blue (Primary - Control/Actions)
        'oem-blue': {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcd9ff',
          300: '#8ec2ff',
          400: '#59a0ff',
          500: '#3381fc',
          600: '#1c62f2',
          700: '#154cde',
          800: '#183fb4',
          900: '#19398e',
        },
        // Teal (Secondary - Analytics/Data)
        'oem-teal': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Amber (Warnings/Attention)
        'oem-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Rose (Critical/Alerts)
        'oem-rose': {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Emerald (Success/Positive)
        'oem-emerald': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Violet (AI/Insights)
        'oem-violet': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, rgba(51, 129, 252, 0.04) 0%, rgba(20, 184, 166, 0.04) 50%, rgba(139, 92, 246, 0.04) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 28px rgba(51, 129, 252, 0.45)',
        'glow-teal': '0 0 28px rgba(20, 184, 166, 0.45)',
        'glow-amber': '0 0 28px rgba(251, 191, 36, 0.45)',
        'glow-rose': '0 0 28px rgba(244, 63, 94, 0.45)',
        'glow-emerald': '0 0 28px rgba(16, 185, 129, 0.45)',
        'glow-violet': '0 0 28px rgba(139, 92, 246, 0.45)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.35), 0 2px 4px -2px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 12px 28px -5px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(0, 0, 0, 0.35)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
