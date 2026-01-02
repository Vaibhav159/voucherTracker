/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-color)',
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',

                // Accents
                'accent-cyan': 'var(--accent-cyan)',
                'accent-pink': 'var(--accent-pink)',
                'accent-violet': 'var(--accent-violet)',
                'accent-cyan-dim': 'var(--accent-cyan-dim)',

                // Glassmorphism
                'glass-bg': 'var(--glass-bg)',
                'glass-border': 'var(--glass-border)',
                'glass-highlight': 'var(--glass-highlight)',

                // UI Elements
                'nav-bg': 'var(--nav-bg)',
                'nav-bg-hover': 'var(--nav-bg-hover)',
                'item-bg': 'var(--item-bg)',
                'item-border': 'var(--item-border)',
                'modal-bg': 'var(--modal-bg)',

                // Status
                success: 'var(--color-success)',
            },
            fontFamily: {
                sans: ['var(--font-family)', 'sans-serif'],
            },
            borderRadius: {
                card: 'var(--card-radius)', // 24px
            },
            transitionTimingFunction: {
                'spring': 'var(--ease-spring)',
                'smooth': 'var(--ease-smooth)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
