import { createContext, useContext, useState, useEffect } from 'react';

// Theme definitions with full color palettes
const themes = {
    espresso: {
        id: 'espresso',
        name: 'Heritage Espresso',
        tagline: 'Warm Luxury, Timeless Elegance',
        colors: {
            bg: '#0F0A08',
            bgAlt: '#050505',
            surface: '#18100C',
            surfaceHover: '#241A15',
            accent: '#D4AF37',
            accentHover: '#E5C875',
            accentDim: '#8A7120',
            accentSecondary: '#8c5341',
            textPrimary: '#F9FAF5',
            textSecondary: '#a68a6d',
            textMuted: '#6B5B4D',
            border: '#3D2E26',
            borderAccent: '#b87332',
            scrollbarTrack: '#1a0f0c',
            scrollbarThumb: '#3c221b',
            scrollbarHover: '#c87f45',
        },
        fonts: {
            headline: 'Playfair Display',
            body: 'Inter',
        },
    },
    obsidian: {
        id: 'obsidian',
        name: 'Obsidian & Chrome',
        tagline: 'Sleek Tech Luxury, Surgical Precision',
        colors: {
            bg: '#121212',
            bgAlt: '#0a0a0a',
            surface: '#1a1a1a',
            surfaceHover: '#242424',
            accent: '#a5f3fc',
            accentHover: '#67e8f9',
            accentDim: '#164e63',
            accentSecondary: '#0e7490',
            textPrimary: '#F5F5F5',
            textSecondary: '#9CA3AF',
            textMuted: '#6B7280',
            border: '#3f3f3f',
            borderAccent: '#a5f3fc',
            scrollbarTrack: '#121212',
            scrollbarThumb: '#3f3f3f',
            scrollbarHover: '#a5f3fc',
        },
        fonts: {
            headline: 'Cinzel',
            body: 'Inter',
        },
    },
    sapphire: {
        id: 'sapphire',
        name: 'Sapphire & Platinum',
        tagline: 'Regal Authority, Elite Heritage',
        colors: {
            bg: '#0a1628',
            bgAlt: '#050d18',
            surface: '#0f1f3d',
            surfaceHover: '#162d52',
            accent: '#E5E7EB',
            accentHover: '#F9FAFB',
            accentDim: '#6B7280',
            accentSecondary: '#CBD5E1',
            textPrimary: '#FFFFFF',
            textSecondary: '#94A3B8',
            textMuted: '#64748B',
            border: '#1e3a5f',
            borderAccent: '#CBD5E1',
            scrollbarTrack: '#0a1628',
            scrollbarThumb: '#1e3a5f',
            scrollbarHover: '#E5E7EB',
        },
        fonts: {
            headline: 'Playfair Display',
            body: 'Inter',
        },
    },
    racingGreen: {
        id: 'racingGreen',
        name: 'Racing Green & Steel',
        tagline: 'Heritage Automotive, Bespoke Craftsmanship',
        colors: {
            bg: '#0a1f14',
            bgAlt: '#051208',
            surface: '#112a1c',
            surfaceHover: '#1a3d29',
            accent: '#B8C4CE',
            accentHover: '#D1D9E0',
            accentDim: '#64748B',
            accentSecondary: '#78A57A',
            textPrimary: '#FAF9F6',
            textSecondary: '#9CA38B',
            textMuted: '#6B7260',
            border: '#1a3d29',
            borderAccent: '#B8C4CE',
            scrollbarTrack: '#0a1f14',
            scrollbarThumb: '#1a3d29',
            scrollbarHover: '#B8C4CE',
        },
        fonts: {
            headline: 'Playfair Display',
            body: 'Inter',
        },
    },
    stealth: {
        id: 'stealth',
        name: 'Stealth Black',
        tagline: 'The Black Card, Ultimate Exclusivity',
        colors: {
            bg: '#080808',
            bgAlt: '#050505',
            surface: '#0f0f0f',
            surfaceHover: '#171717',
            accent: '#3b82f6',
            accentHover: '#60a5fa',
            accentDim: '#1e3a5f',
            accentSecondary: '#1e3a8a',
            textPrimary: '#FFFFFF',
            textSecondary: '#6B7280',
            textMuted: '#4B5563',
            border: '#1a1a1a',
            borderAccent: '#3b82f6',
            scrollbarTrack: '#080808',
            scrollbarThumb: '#1a1a1a',
            scrollbarHover: '#3b82f6',
        },
        fonts: {
            headline: 'Playfair Display',
            body: 'Inter',
        },
    },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
    // Initialize theme from localStorage or default to espresso
    const [theme, setThemeState] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cardperks-theme');
            if (saved && themes[saved]) {
                return saved;
            }
        }
        return 'espresso';
    });

    // Apply theme to document and CSS variables
    useEffect(() => {
        const root = document.documentElement;
        const themeData = themes[theme];

        if (!themeData) return;

        // Set data attribute for CSS selectors
        root.setAttribute('data-theme', theme);

        // Apply CSS custom properties
        const { colors } = themeData;
        root.style.setProperty('--theme-bg', colors.bg);
        root.style.setProperty('--theme-bg-alt', colors.bgAlt);
        root.style.setProperty('--theme-surface', colors.surface);
        root.style.setProperty('--theme-surface-hover', colors.surfaceHover);
        root.style.setProperty('--theme-accent', colors.accent);
        root.style.setProperty('--theme-accent-hover', colors.accentHover);
        root.style.setProperty('--theme-accent-dim', colors.accentDim);
        root.style.setProperty('--theme-accent-secondary', colors.accentSecondary);
        root.style.setProperty('--theme-text-primary', colors.textPrimary);
        root.style.setProperty('--theme-text-secondary', colors.textSecondary);
        root.style.setProperty('--theme-text-muted', colors.textMuted);
        root.style.setProperty('--theme-border', colors.border);
        root.style.setProperty('--theme-border-accent', colors.borderAccent);
        root.style.setProperty('--theme-scrollbar-track', colors.scrollbarTrack);
        root.style.setProperty('--theme-scrollbar-thumb', colors.scrollbarThumb);
        root.style.setProperty('--theme-scrollbar-hover', colors.scrollbarHover);

        // Persist to localStorage
        localStorage.setItem('cardperks-theme', theme);
    }, [theme]);

    const setTheme = (newTheme) => {
        if (themes[newTheme]) {
            setThemeState(newTheme);
        }
    };

    const value = {
        theme,
        setTheme,
        themes,
        currentTheme: themes[theme],
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export { themes };
