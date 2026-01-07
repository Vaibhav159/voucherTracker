/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        espresso: {
          950: "#0F0A08", // Main Background (Deepest)
          900: "#18100C", // Sidebar/Header (Deep)
          800: "#241A15", // Cards/Surfaces
          700: "#3D2E26", // Borders/Divisions
        },
        gold: {
          100: "#f9f1d8", // Text light
          200: "#efe0aa",
          300: "#E5C875",
          400: "#D4AF37", // Primary Gold
          500: "#B59428",
          600: "#967A1D",
        },
        copper: {
          300: "#e8b088",
          400: "#E09F7D",
          500: "#CD7F32", // Primary Copper
          600: "#A05A1C",
        },
        ivory: "#F9FAF5", // Body text
        "off-white": "#faf7f5",
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "serif": ["Playfair Display", "serif"],
        "display": ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      animation: {
        'shimmer': 'shimmer 10s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'espresso-gradient': 'linear-gradient(135deg, #130a06 0%, #1f120d 100%)',
        'metallic-sheen': 'linear-gradient(45deg, rgba(212, 175, 55, 0.05) 25%, transparent 25%, transparent 50%, rgba(212, 175, 55, 0.05) 50%, rgba(212, 175, 55, 0.05) 75%, transparent 75%, transparent)',
        'copper-gradient': 'linear-gradient(135deg, rgba(200,127,69,0.15) 0%, rgba(200,127,69,0) 50%, rgba(200,127,69,0.05) 100%)',
        'gold-gradient-text': 'linear-gradient(to right, #c87f45, #eecfa1, #c87f45)',
        'nav-gradient': 'linear-gradient(to bottom, #2b1813, #1a0f0c)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
