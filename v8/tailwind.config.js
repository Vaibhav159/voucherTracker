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
                "modal-bg": "#1c1917", // Richer Espresso for Modal
                "panel-bg": "#141210", // Darker Panel
                "card-bg": "#201c1a",
                "card-border": "#b87332", // Polished copper hairline

                // Banking Page Specific Colors
                "espresso-dark": "#050505",
                "espresso-card": "#121212",
                "espresso-sidebar": "#0a0a0a",
                "espresso-light": "#1a1a1a",
                "copper": "#c88a4d",
                "copper-light": "#e6ad76",
                "copper-dark": "#8a5a35",
                "copper-muted": "#a68a78",
                "gold": "#f0c961",
                "gold-dim": "#d4b8a3",
                "warm-white": "#f8f8f8",
                "icy-blue": "#a5f3fc",

                // Perk AI Response Page Colors
                "obsidian": "#080808",
                "espresso-matte": "#1C1917",
                "leather": "#1A1614",
                "primary-light": "#F3E5AB",
                "primary-dim": "#8A7120",

                // Espresso shades
                "espresso": {
                    950: "#0f0502", // Deepest black-brown (Background)
                    900: "#1a0b08", // Sidebar / Header
                    850: "#24120e", // Card Panels
                    800: "#2e1812", // Interactive Elements
                    700: "#452216", // Borders/Lines
                },
                "gold": {
                    100: "#fffdf5",
                    200: "#fbeeb6",
                    300: "#e8d695",
                    400: "#d4af37", // Metallic Gold
                    500: "#b08d26",
                    600: "#8c6e1b",
                },
                "copper": {
                    300: "#f0c4a6",
                    400: "#d99a6c",
                    500: "#cd7f32", // Primary Copper
                    600: "#b8732d",
                    700: "#8f5923",
                },
                "ivory": "#F9FAF5",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "serif": ["Playfair Display", "serif"],
                "display": ["Inter", "sans-serif"],
                "cinzel": ["Cinzel", "serif"],
                "epilogue": ["Epilogue", "sans-serif"],
                "body": ["Noto Sans", "sans-serif"],
                "serif-premium": ["Cinzel", "serif"],
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
                'espresso-texture': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%232a1610\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                'card-sheen': 'linear-gradient(105deg, transparent 20%, rgba(205, 127, 50, 0.15) 25%, rgba(255, 255, 255, 0.2) 30%, rgba(205, 127, 50, 0.15) 35%, transparent 40%)',
                'gold-badge': 'linear-gradient(135deg, #d4af37 0%, #f9f1d0 50%, #b08d26 100%)',
                'metal-sheen': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.03) 100%)',
                'copper-sheen': 'linear-gradient(105deg, transparent 20%, rgba(205, 127, 50, 0.2) 25%, rgba(255, 255, 255, 0.4) 30%, rgba(205, 127, 50, 0.2) 35%, transparent 40%)',
                'gold-btn-gradient': 'linear-gradient(135deg, #cd7f32 0%, #d4af37 50%, #cd7f32 100%)',
                'metallic-badge': 'linear-gradient(180deg, #FCEda4 0%, #D4AF37 40%, #8c5626 100%)',
                'gold-text': 'linear-gradient(to bottom, #f3e6b5 0%, #d4af37 50%, #b88a44 100%)',
                'highlight-row': 'linear-gradient(90deg, #b87332 0%, #D4AF37 50%, #b87332 100%)',
                'noise': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MDAnIGhlaWdodD0nNDAwJz48ZmlsdGVyIGlkPSdub2lzZSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdmcmFjdGFsTm9pc2UnIGJhc2VGcmVxdWVuY3k9JzAuOScgbnVtT2N0YXZlcz0nMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZSknIG9wYWNpdHk9JzAuMDUnLz48L3N2Zz4=')",
                'pop-scale': 'popScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                'sheen': 'sheen 3s infinite ease-in-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-soft': 'pulseSoft 3s infinite ease-in-out',
                'press': 'press 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                'breathe-glow': 'breathe-glow 4s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                popScale: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
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
                },
                shimmerBg: {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '100% 100%' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5)) brightness(1)' },
                    '50%': { transform: 'scale(1.02)', filter: 'drop-shadow(0 0 30px rgba(184, 115, 51, 0.3)) brightness(1.1)' },
                },
                pulseCopper: {
                    '0%, 100%': { borderColor: 'rgba(184, 115, 51, 0.4)', boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.95)' },
                    '50%': { borderColor: 'rgba(184, 115, 51, 0.8)', boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.95), 0 0 20px rgba(184, 115, 51, 0.25)' },
                },
                spotlightMove: {
                    '0%, 100%': { opacity: '0.4', transform: 'translateX(-5%)' },
                    '50%': { opacity: '0.6', transform: 'translateX(5%)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'shimmer': 'shimmer 2s linear infinite',
                'fade-in-up': 'fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'shimmer-bg': 'shimmerBg 15s ease-in-out infinite alternate',
                'breathe': 'breathe 5s ease-in-out infinite',
                'pulse-copper': 'pulseCopper 3s infinite',
                'spotlight-move': 'spotlightMove 10s ease-in-out infinite',
            },
            boxShadow: {
                'glow-copper': '0 0 20px rgba(205, 127, 50, 0.25)',
                'glow-gold': '0 0 15px rgba(212, 175, 55, 0.3)',
                'copper-glow': '0 0 20px -5px rgba(205, 127, 50, 0.3)',
                'gold-glow': '0 0 15px -3px rgba(212, 175, 55, 0.4)',
                'card-depth': '0 20px 40px -5px rgba(0,0,0,0.6)',
                'card-hover': '0 25px 50px -12px rgba(205, 127, 50, 0.15)',
                'engraved': 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.03)',
                'slot': 'inset 0 3px 6px rgba(0,0,0,0.95), 0 1px 0 rgba(255,255,255,0.05)',
                'tile-hover': '0 10px 30px -5px rgba(0,0,0,0.8), 0 0 0 1px rgba(184, 115, 51, 0.3), 0 0 20px rgba(184, 115, 51, 0.1)',
                'golden-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
                'strategy-glow': '0 0 40px -10px rgba(212, 175, 55, 0.15), inset 0 0 20px rgba(212, 175, 55, 0.05)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/container-queries'),
    ],
}
