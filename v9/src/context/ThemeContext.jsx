import { createContext, useContext, useState, useEffect } from 'react';

/**
 * V9 Theme System
 * Premium themes with light/dark mode support
 */

// Theme definitions with light and dark variants
const themeDefinitions = {
    espresso: {
        id: 'espresso',
        name: 'Espresso',
        description: 'Warm luxury with gold accents',
        dark: {
            bg: '#0F0A08',
            bgAlt: '#1A1412',
            surface: '#241C18',
            surfaceHover: '#2E241E',
            accent: '#D4AF37',
            accentHover: '#E5C44D',
            accentMuted: '#8A7B2A',
            textPrimary: '#FAF7F2',
            textSecondary: '#C4B8A8',
            textMuted: '#7D7168',
            border: '#3D342C',
            borderAccent: '#B8963B',
        },
        light: {
            bg: '#FBF9F7',
            bgAlt: '#F5F2EE',
            surface: '#FFFFFF',
            surfaceHover: '#F8F5F1',
            accent: '#B8963B',
            accentHover: '#9A7D32',
            accentMuted: '#D4C4A0',
            textPrimary: '#1A1412',
            textSecondary: '#5C524A',
            textMuted: '#8C8278',
            border: '#E8E2DA',
            borderAccent: '#D4AF37',
        },
    },
    obsidian: {
        id: 'obsidian',
        name: 'Obsidian',
        description: 'Sleek tech with cyan accents',
        dark: {
            bg: '#0A0A0A',
            bgAlt: '#121212',
            surface: '#1A1A1A',
            surfaceHover: '#242424',
            accent: '#22D3EE',
            accentHover: '#06B6D4',
            accentMuted: '#155E75',
            textPrimary: '#FAFAFA',
            textSecondary: '#A3A3A3',
            textMuted: '#525252',
            border: '#2A2A2A',
            borderAccent: '#22D3EE',
        },
        light: {
            bg: '#FAFAFA',
            bgAlt: '#F4F4F5',
            surface: '#FFFFFF',
            surfaceHover: '#F8F8F8',
            accent: '#0891B2',
            accentHover: '#0E7490',
            accentMuted: '#A5F3FC',
            textPrimary: '#0A0A0A',
            textSecondary: '#525252',
            textMuted: '#A3A3A3',
            border: '#E4E4E7',
            borderAccent: '#22D3EE',
        },
    },
    neonVelocity: {
        id: 'neonVelocity',
        name: 'Neon Velocity',
        description: 'High-tech fintech with electric blue',
        dark: {
            bg: '#050510',
            bgAlt: '#0A0A18',
            surface: '#101020',
            surfaceHover: '#18182A',
            accent: '#00D4FF',
            accentHover: '#33DDFF',
            accentMuted: '#0066AA',
            textPrimary: '#F0F8FF',
            textSecondary: '#88AACC',
            textMuted: '#4466AA',
            border: '#1A2040',
            borderAccent: '#00AADD',
        },
        light: {
            bg: '#F5F8FC',
            bgAlt: '#EEF2F8',
            surface: '#FFFFFF',
            surfaceHover: '#F0F4FA',
            accent: '#0088CC',
            accentHover: '#0066AA',
            accentMuted: '#AAD4EE',
            textPrimary: '#0A1020',
            textSecondary: '#446688',
            textMuted: '#88AACC',
            border: '#D0E0F0',
            borderAccent: '#00AADD',
        },
    },
    marble: {
        id: 'marble',
        name: 'Minimalist Marble',
        description: 'Editorial elegance with whitespace',
        dark: {
            bg: '#0C0C0C',
            bgAlt: '#141414',
            surface: '#1C1C1C',
            surfaceHover: '#262626',
            accent: '#E8E4E0',
            accentHover: '#F4F0EC',
            accentMuted: '#6A6866',
            textPrimary: '#FAFAF8',
            textSecondary: '#B0ACA8',
            textMuted: '#686460',
            border: '#2A2826',
            borderAccent: '#A8A4A0',
        },
        light: {
            bg: '#FAFAF8',
            bgAlt: '#F4F4F2',
            surface: '#FFFFFF',
            surfaceHover: '#F8F8F6',
            accent: '#2A2826',
            accentHover: '#1A1816',
            accentMuted: '#C8C4C0',
            textPrimary: '#1A1816',
            textSecondary: '#5A5856',
            textMuted: '#8A8886',
            border: '#E4E2E0',
            borderAccent: '#4A4846',
        },
    },
    amethyst: {
        id: 'amethyst',
        name: 'Royal Amethyst',
        description: 'Vibrant purple with frosted glass',
        dark: {
            bg: '#0C0814',
            bgAlt: '#14101E',
            surface: '#1E1828',
            surfaceHover: '#282234',
            accent: '#A855F7',
            accentHover: '#C084FC',
            accentMuted: '#6B21A8',
            textPrimary: '#FAF5FF',
            textSecondary: '#C4B5D0',
            textMuted: '#7A6B88',
            border: '#2E2640',
            borderAccent: '#9333EA',
        },
        light: {
            bg: '#FDFAFF',
            bgAlt: '#F8F4FC',
            surface: '#FFFFFF',
            surfaceHover: '#FAF6FE',
            accent: '#7C3AED',
            accentHover: '#6D28D9',
            accentMuted: '#DDD6FE',
            textPrimary: '#1E1028',
            textSecondary: '#5B4870',
            textMuted: '#9888A8',
            border: '#EBE4F4',
            borderAccent: '#A855F7',
        },
    },
    steel: {
        id: 'steel',
        name: 'Industrial Steel',
        description: 'Metallic precision with orange accents',
        dark: {
            bg: '#0A0C0E',
            bgAlt: '#121416',
            surface: '#1A1C20',
            surfaceHover: '#24262A',
            accent: '#F97316',
            accentHover: '#FB923C',
            accentMuted: '#9A4A10',
            textPrimary: '#F4F4F6',
            textSecondary: '#9CA0A8',
            textMuted: '#5C6068',
            border: '#2A2E34',
            borderAccent: '#EA580C',
        },
        light: {
            bg: '#F6F8FA',
            bgAlt: '#EEF0F2',
            surface: '#FFFFFF',
            surfaceHover: '#F4F6F8',
            accent: '#EA580C',
            accentHover: '#C2410C',
            accentMuted: '#FED7AA',
            textPrimary: '#1A1C20',
            textSecondary: '#4A4E54',
            textMuted: '#8A8E94',
            border: '#DEE2E6',
            borderAccent: '#F97316',
        },
    },
    midnightObsidian: {
        id: 'midnightObsidian',
        name: 'Midnight Obsidian',
        description: 'Navy and charcoal with neon cyan',
        dark: {
            bg: '#080B12',
            bgAlt: '#0E1218',
            surface: '#141A24',
            surfaceHover: '#1C242E',
            accent: '#00F5FF',
            accentHover: '#40F8FF',
            accentMuted: '#00808A',
            textPrimary: '#E8F0F8',
            textSecondary: '#8AA0B8',
            textMuted: '#4A6080',
            border: '#1E2A38',
            borderAccent: '#00C8D4',
        },
        light: {
            bg: '#F4F8FC',
            bgAlt: '#E8EEF4',
            surface: '#FFFFFF',
            surfaceHover: '#F0F4F8',
            accent: '#0090A0',
            accentHover: '#007888',
            accentMuted: '#A0E8F0',
            textPrimary: '#101820',
            textSecondary: '#405060',
            textMuted: '#8090A0',
            border: '#D4E0EC',
            borderAccent: '#00B8C8',
        },
    },
    prismGlass: {
        id: 'prismGlass',
        name: 'Prism Glass',
        description: 'Iridescent gradients and frosted glass',
        dark: {
            bg: '#08080C',
            bgAlt: '#101014',
            surface: '#18181E',
            surfaceHover: '#222228',
            accent: '#E879F9',
            accentHover: '#F0ABFC',
            accentMuted: '#86198F',
            textPrimary: '#FAFAFC',
            textSecondary: '#A8A8B8',
            textMuted: '#606070',
            border: '#28283A',
            borderAccent: '#D946EF',
        },
        light: {
            bg: '#FAFAFC',
            bgAlt: '#F4F4F8',
            surface: '#FFFFFF',
            surfaceHover: '#F8F8FB',
            accent: '#C026D3',
            accentHover: '#A21CAF',
            accentMuted: '#F5D0FE',
            textPrimary: '#18181C',
            textSecondary: '#505058',
            textMuted: '#909098',
            border: '#E8E8F0',
            borderAccent: '#E879F9',
        },
    },
    arcticAurora: {
        id: 'arcticAurora',
        name: 'Arctic Aurora',
        description: 'Northern lights with icy blues',
        dark: {
            bg: '#050A10',
            bgAlt: '#0A1018',
            surface: '#101820',
            surfaceHover: '#18222C',
            accent: '#38BDF8',
            accentHover: '#7DD3FC',
            accentMuted: '#0369A1',
            textPrimary: '#F0F9FF',
            textSecondary: '#7DD3FC',
            textMuted: '#0284C7',
            border: '#164E63',
            borderAccent: '#0EA5E9',
        },
        light: {
            bg: '#F0F9FF',
            bgAlt: '#E0F2FE',
            surface: '#FFFFFF',
            surfaceHover: '#F0F9FF',
            accent: '#0284C7',
            accentHover: '#0369A1',
            accentMuted: '#BAE6FD',
            textPrimary: '#082F49',
            textSecondary: '#0C4A6E',
            textMuted: '#7DD3FC',
            border: '#BAE6FD',
            borderAccent: '#38BDF8',
        },
    },
    vintageLeather: {
        id: 'vintageLeather',
        name: 'Vintage Leather',
        description: 'Classic brown with aged patina',
        dark: {
            bg: '#0C0806',
            bgAlt: '#14100C',
            surface: '#1E1814',
            surfaceHover: '#28201A',
            accent: '#C4A484',
            accentHover: '#D4B494',
            accentMuted: '#7A5C42',
            textPrimary: '#F8F4F0',
            textSecondary: '#C8B8A8',
            textMuted: '#786858',
            border: '#382C24',
            borderAccent: '#A08060',
        },
        light: {
            bg: '#FDF8F4',
            bgAlt: '#F8F0E8',
            surface: '#FFFFFF',
            surfaceHover: '#FAF6F2',
            accent: '#8B5A2B',
            accentHover: '#6B4423',
            accentMuted: '#DCC8B4',
            textPrimary: '#2C1810',
            textSecondary: '#5C4030',
            textMuted: '#9C8878',
            border: '#E8DCD0',
            borderAccent: '#B8956C',
        },
    },
    oceanDepths: {
        id: 'oceanDepths',
        name: 'Ocean Depths',
        description: 'Deep sea blues with bioluminescence',
        dark: {
            bg: '#020A14',
            bgAlt: '#04101C',
            surface: '#081828',
            surfaceHover: '#0C2034',
            accent: '#06B6D4',
            accentHover: '#22D3EE',
            accentMuted: '#0E7490',
            textPrimary: '#ECFEFF',
            textSecondary: '#67E8F9',
            textMuted: '#155E75',
            border: '#164E63',
            borderAccent: '#0891B2',
        },
        light: {
            bg: '#ECFEFF',
            bgAlt: '#CFFAFE',
            surface: '#FFFFFF',
            surfaceHover: '#ECFEFF',
            accent: '#0E7490',
            accentHover: '#155E75',
            accentMuted: '#A5F3FC',
            textPrimary: '#083344',
            textSecondary: '#164E63',
            textMuted: '#67E8F9',
            border: '#A5F3FC',
            borderAccent: '#06B6D4',
        },
    },
    terracotta: {
        id: 'terracotta',
        name: 'Terracotta',
        description: 'Earthy warm Mediterranean',
        dark: {
            bg: '#0E0908',
            bgAlt: '#161110',
            surface: '#201A18',
            surfaceHover: '#2A2220',
            accent: '#E07850',
            accentHover: '#E89070',
            accentMuted: '#8B4C38',
            textPrimary: '#FAF6F4',
            textSecondary: '#D4B8A8',
            textMuted: '#8A7468',
            border: '#3A2E2A',
            borderAccent: '#C45C38',
        },
        light: {
            bg: '#FDF8F6',
            bgAlt: '#FAF0EC',
            surface: '#FFFFFF',
            surfaceHover: '#FCF6F3',
            accent: '#C45C38',
            accentHover: '#A04828',
            accentMuted: '#F0C8B8',
            textPrimary: '#2A1C18',
            textSecondary: '#5C4438',
            textMuted: '#A08878',
            border: '#F0DCD4',
            borderAccent: '#E07850',
        },
    },
    carbonFiber: {
        id: 'carbonFiber',
        name: 'Carbon Fiber',
        description: 'Racing tech with red accents',
        dark: {
            bg: '#080808',
            bgAlt: '#101010',
            surface: '#181818',
            surfaceHover: '#202020',
            accent: '#EF4444',
            accentHover: '#F87171',
            accentMuted: '#991B1B',
            textPrimary: '#FAFAFA',
            textSecondary: '#A0A0A0',
            textMuted: '#505050',
            border: '#282828',
            borderAccent: '#DC2626',
        },
        light: {
            bg: '#FAFAFA',
            bgAlt: '#F0F0F0',
            surface: '#FFFFFF',
            surfaceHover: '#F8F8F8',
            accent: '#DC2626',
            accentHover: '#B91C1C',
            accentMuted: '#FECACA',
            textPrimary: '#181818',
            textSecondary: '#525252',
            textMuted: '#A3A3A3',
            border: '#E5E5E5',
            borderAccent: '#EF4444',
        },
    },
    emeraldCity: {
        id: 'emeraldCity',
        name: 'Emerald City',
        description: 'Rich green luxury',
        dark: {
            bg: '#040A08',
            bgAlt: '#081210',
            surface: '#101C18',
            surfaceHover: '#182620',
            accent: '#34D399',
            accentHover: '#6EE7B7',
            accentMuted: '#047857',
            textPrimary: '#ECFDF5',
            textSecondary: '#6EE7B7',
            textMuted: '#047857',
            border: '#064E3B',
            borderAccent: '#10B981',
        },
        light: {
            bg: '#ECFDF5',
            bgAlt: '#D1FAE5',
            surface: '#FFFFFF',
            surfaceHover: '#ECFDF5',
            accent: '#059669',
            accentHover: '#047857',
            accentMuted: '#A7F3D0',
            textPrimary: '#022C22',
            textSecondary: '#065F46',
            textMuted: '#6EE7B7',
            border: '#A7F3D0',
            borderAccent: '#34D399',
        },
    },
    sunsetBoulevard: {
        id: 'sunsetBoulevard',
        name: 'Sunset Boulevard',
        description: 'Warm gradient twilight',
        dark: {
            bg: '#0C0808',
            bgAlt: '#141010',
            surface: '#1C1616',
            surfaceHover: '#261E1E',
            accent: '#FB7185',
            accentHover: '#FDA4AF',
            accentMuted: '#9F1239',
            textPrimary: '#FFF1F2',
            textSecondary: '#FECDD3',
            textMuted: '#BE123C',
            border: '#3B1C24',
            borderAccent: '#F43F5E',
        },
        light: {
            bg: '#FFF1F2',
            bgAlt: '#FFE4E6',
            surface: '#FFFFFF',
            surfaceHover: '#FFF1F2',
            accent: '#E11D48',
            accentHover: '#BE123C',
            accentMuted: '#FECDD3',
            textPrimary: '#1C0A0C',
            textSecondary: '#9F1239',
            textMuted: '#FB7185',
            border: '#FECDD3',
            borderAccent: '#F43F5E',
        },
    },
};

// Get available theme IDs
export const themeIds = Object.keys(themeDefinitions);

// Create context
const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
    // Initialize from localStorage
    const [themeId, setThemeId] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('v9-theme') || 'espresso';
        }
        return 'espresso';
    });

    const [mode, setMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('v9-mode');
            if (saved) return saved;
            // Check system preference
            if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
                return 'light';
            }
        }
        return 'dark';
    });

    // Apply theme CSS variables
    useEffect(() => {
        const theme = themeDefinitions[themeId];
        if (!theme) return;

        const colors = theme[mode];
        const root = document.documentElement;

        // Set data attributes
        root.setAttribute('data-theme', themeId);
        root.setAttribute('data-mode', mode);

        // Apply CSS custom properties
        Object.entries(colors).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            root.style.setProperty(cssVar, value);
        });

        // Set body background
        document.body.style.backgroundColor = colors.bg;
        document.body.style.color = colors.textPrimary;

        // Persist to localStorage
        localStorage.setItem('v9-theme', themeId);
        localStorage.setItem('v9-mode', mode);
    }, [themeId, mode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const savedMode = localStorage.getItem('v9-mode');
            if (!savedMode) {
                setMode(e.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const setTheme = (newThemeId) => {
        if (themeDefinitions[newThemeId]) {
            setThemeId(newThemeId);
        }
    };

    const toggleMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = {
        themeId,
        mode,
        setTheme,
        setMode,
        toggleMode,
        themes: themeDefinitions,
        currentTheme: themeDefinitions[themeId],
        colors: themeDefinitions[themeId]?.[mode],
        isDark: mode === 'dark',
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

export { themeDefinitions };
