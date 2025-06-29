/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaeffb',
          100: '#d5dff7',
          200: '#abbfe9',
          300: '#819fdb',
          400: '#577fcd',
          500: '#1e3a7b', // Main ENSPD navy blue
          600: '#182e62',
          700: '#12234a',
          800: '#0c1731',
          900: '#060c19',
        },
        secondary: {
          50: '#fff5e9',
          100: '#feebd3',
          200: '#fdd7a7',
          300: '#fbc47c',
          400: '#fab050',
          500: '#e67a0e', // Main ENSPD orange
          600: '#cc6d0d',
          700: '#a5570a',
          800: '#7e4208',
          900: '#572c04',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#868e96',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-shadow': 'pulse-shadow 3s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.3s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.4s ease-out forwards',
        'bounce-in-mobile': 'bounce-in-mobile 0.5s ease-out forwards',
        'burger-glow': 'burger-line-glow 2s ease-in-out infinite',
        'burger-rotate-in': 'burger-rotate-in 0.4s ease-out forwards',
        'burger-scale-bounce': 'burger-scale-bounce 0.6s ease-out forwards',
        'burger-line-wave': 'burger-line-wave 1.5s ease-in-out infinite',
        'ripple-effect': 'ripple-effect 0.6s ease-out forwards',
        'rotate-360': 'rotate-360 0.5s ease-in-out forwards',
        'spin-slow': 'spin-slow 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s forwards',
        'fade-out': 'fadeOut 0.3s forwards',
        'heartbeat': 'heartBeat 1s ease-in-out',
        'grow-from-left': 'growFromLeft 0.3s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-shadow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(0, 58, 123, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 58, 123, 0.4)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in-down': {
          'from': { opacity: '0', transform: 'translateY(-10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-in-mobile': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
