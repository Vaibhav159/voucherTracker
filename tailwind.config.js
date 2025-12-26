/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Outfit"', 'sans-serif'], // Direct reference since var uses it
            },
            colors: {
                // Theme Colors mapped to CSS Variables
                bg: 'var(--bg-color)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',

                // Accents
                'accent-cyan': 'var(--accent-cyan)',
                'accent-pink': 'var(--accent-pink)',
                'accent-violet': 'var(--accent-violet)',
                'accent-cyan-dim': 'var(--accent-cyan-dim)',

                // Glass UI
                'glass-bg': 'var(--glass-bg)',
                'glass-border': 'var(--glass-border)',
                'glass-highlight': 'var(--glass-highlight)',

                // Navigation
                'nav-text': 'var(--nav-text)',
                'nav-text-hover': 'var(--nav-text-hover)',
                'nav-bg': 'var(--nav-bg)',
                'nav-bg-hover': 'var(--nav-bg-hover)',
                'nav-bg-active': 'var(--nav-bg-active)',

                // Structural
                'header-bg': 'var(--header-bg)',
                'modal-bg': 'var(--modal-bg)',
                'modal-border': 'var(--modal-border)',
                'item-bg': 'var(--item-bg)',
                'item-border': 'var(--item-border)',

                // Components
                'tag-bg': 'var(--tag-bg)',
                'tag-text': 'var(--tag-text)',
                'tag-border': 'var(--tag-border)',

                'btn-def-bg': 'var(--btn-secondary-bg)',
                'btn-def-text': 'var(--btn-secondary-text)',
                'btn-def-hover-bg': 'var(--btn-secondary-hover-bg)',
                'btn-def-hover-text': 'var(--btn-secondary-hover-text)',

                'card-title': 'var(--card-title)',
                'card-hover-border': 'var(--card-hover-border)',
                'spinner-border': 'var(--spinner-border)',

                'success': 'var(--color-success)',
                'text-on-success': 'var(--text-on-success)',
            },
            backgroundImage: {
                'primary-glow': 'var(--primary-glow)',
            },
            borderRadius: {
                'card': 'var(--card-radius)',
            },
        },
    },
    plugins: [],
}
