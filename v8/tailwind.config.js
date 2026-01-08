export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#c87f45", // Copper
                "primary-hover": "#df955d", // Lighter Copper
                "background-light": "#fffaf5",
                "background-dark": "#1a0f0c", // Deep Espresso
                "surface-dark": "#2b1813", // Lighter Espresso
                "surface-dark-hover": "#3c221b",
                "gold-text": "#eecfa1", // Opulent Gold
                "gold-dim": "#a68a6d", // Muted Gold
                "warm-white": "#f5e6d3", // Creamy White
                "warm-gray": "#bba595", // Latte Gray
                "accent-red": "#9c3838",
                "off-white": "#f2ebe6",
                // Espresso shades
                "espresso": {
                    950: "#050202", // Deepest black-brown (Updated)
                    900: "#120806", // Rich espresso (Updated)
                    850: "#1e0f0b", // Panel BG (New)
                    800: "#2a1610", // Lighter panels (Updated)
                    700: "#452216",
                },
                "gold": {
                    100: "#fffdf5", // Crisp white/gold tint (New)
                    200: "#f9f1d0", // (New)
                    300: "#E5C875",
                    400: "#d4af37", // Metallic Gold (Updated)
                    500: "#b08d26", // (Updated)
                    600: "#8c6e1b", // (Updated)
                },
                "copper": {
                    300: "#f0c4a6", // (New)
                    400: "#e09f70", // (Updated)
                    500: "#cd7f32", // Primary Copper (Updated)
                    600: "#a05a26", // (Updated)
                    700: "#75401b", // (New)
                },
                "ivory": "#F9FAF5",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
                "display": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            backgroundImage: {
                'copper-gradient': 'linear-gradient(135deg, rgba(200,127,69,0.15) 0%, rgba(200,127,69,0) 50%, rgba(200,127,69,0.05) 100%)',
                'gold-gradient-text': 'linear-gradient(to right, #c87f45, #eecfa1, #c87f45)',
                'nav-gradient': 'linear-gradient(to bottom, #2b1813, #1a0f0c)',
                'espresso-texture': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232a1610\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                'card-sheen': 'linear-gradient(105deg, transparent 20%, rgba(205, 127, 50, 0.15) 25%, rgba(255, 255, 255, 0.2) 30%, rgba(205, 127, 50, 0.15) 35%, transparent 40%)',
                'gold-badge': 'linear-gradient(135deg, #d4af37 0%, #f9f1d0 50%, #b08d26 100%)',
            },
            animation: {
                'shimmer': 'shimmer 10s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pop-scale': 'popScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'sheen': 'sheen 3s infinite ease-in-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-soft': 'pulseSoft 3s infinite ease-in-out',
                'press': 'press 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                popScale: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                sheen: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                press: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.97)' },
                    '100%': { transform: 'scale(1)' },
                }
            },
            boxShadow: {
                'glow-copper': '0 0 20px rgba(205, 127, 50, 0.15)',
                'glow-gold': '0 0 15px rgba(212, 175, 55, 0.2)',
                'copper-glow': '0 0 20px -5px rgba(205, 127, 50, 0.3)',
                'gold-glow': '0 0 15px -3px rgba(212, 175, 55, 0.4)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
    ],
}
