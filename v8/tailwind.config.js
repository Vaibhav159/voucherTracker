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
                // Espresso shades for compatibility
                "espresso": {
                    950: "#0F0A08",
                    900: "#18100C",
                    800: "#241A15",
                    700: "#3D2E26",
                },
                "gold": {
                    300: "#E5C875",
                    400: "#D4AF37",
                    500: "#B59428",
                    600: "#967A1D",
                },
                "copper": {
                    400: "#E09F7D",
                    500: "#CD7F32",
                    600: "#A05A1C",
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
            }
        },
    },
    plugins: [],
}
