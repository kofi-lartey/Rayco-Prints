/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // ============================================
            // RAYCOPRINTS BRAND COLORS - Refined Palette
            // ============================================
            colors: {
                // Primary Colors
                'brand': {
                    primary: '#0D3B2E',      // Deep forest green - refined
                    secondary: '#F5B800',     // Golden amber - vibrant
                    accent: '#E85D04',        // Burnt orange - energetic
                },

                // Legacy Rayco Colors (for backward compatibility)
                rayco: {
                    forest: '#0D3B2E',
                    gold: '#F5B800',
                    orange: '#E85D04',
                    sky: '#0EA5E9',
                    sage: '#166534',
                    white: '#FFFFFF',
                },

                // Semantic Colors
                primary: {
                    50: '#E8F5F0',
                    100: '#C5E6D9',
                    200: '#9BCFB9',
                    300: '#6BB898',
                    400: '#3DA17A',
                    500: '#0D3B2E',
                    600: '#0A2F25',
                    700: '#08231C',
                    800: '#051713',
                    900: '#030B0A',
                },

                accent: {
                    50: '#FEF9E7',
                    100: '#FCF0C2',
                    200: '#FAE499',
                    300: '#F7D770',
                    400: '#F5CB47',
                    500: '#F5B800',
                    600: '#C49300',
                    700: '#936E00',
                    800: '#624900',
                    900: '#312400',
                },

                // Neutral Colors - Elegant Grays
                neutral: {
                    50: '#FAFAFA',
                    100: '#F5F5F5',
                    200: '#E5E5E5',
                    300: '#D4D4D4',
                    400: '#A3A3A3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },

                // Status Colors
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                info: '#0EA5E9',

                // Background Colors
                background: {
                    light: '#FAFAFA',
                    DEFAULT: '#FFFFFF',
                    dark: '#0F172A',
                },

                // Surface Colors
                surface: {
                    light: '#F8FAFC',
                    DEFAULT: '#F1F5F9',
                    dark: '#1E293B',
                },

                // Keep legacy colors for backward compatibility
                emerald: {
                    50: '#e6f5ed',
                    100: '#cceadb',
                    200: '#99d5b7',
                    300: '#66c093',
                    400: '#33ab6f',
                    500: '#00964a',
                    600: '#007a3b',
                    700: '#005d2c',
                    800: '#00401e',
                    900: '#00220f',
                    DEFAULT: '#0D3B2E',
                },
                golden: {
                    50: '#fff8e6',
                    100: '#ffefcc',
                    200: '#ffdf99',
                    300: '#ffcf66',
                    400: '#ffbf33',
                    500: '#F5B800',
                    600: '#cc9300',
                    700: '#996e00',
                    800: '#664a00',
                    900: '#332500',
                },
                sky: {
                    50: '#e8f5fb',
                    100: '#d1ebf7',
                    200: '#a3d7ef',
                    300: '#75c3e7',
                    400: '#47afdf',
                    500: '#0EA5E9',
                    600: '#008abd',
                    700: '#00678c',
                    800: '#00445c',
                    900: '#00222b',
                },
                charcoal: {
                    DEFAULT: '#1A1A1A',
                },
                royal: {
                    50: '#e6f0ff',
                    100: '#cce0ff',
                    200: '#99c2ff',
                    300: '#66a3ff',
                    400: '#3385ff',
                    500: '#0066ff',
                    600: '#0052cc',
                    700: '#003d99',
                    800: '#002966',
                    900: '#001433',
                },
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                }
            },

            // Typography
            fontFamily: {
                'heading': ['Playfair Display', 'Georgia', 'serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Inter', 'system-ui', 'sans-serif'],
            },

            // Font Sizes - Refined scale
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1.2' }],
                '6xl': ['3.75rem', { lineHeight: '1.1' }],
                '7xl': ['4.5rem', { lineHeight: '1.1' }],
            },

            // Shadows - More elegant and refined
            boxShadow: {
                // Soft shadows
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
                'soft-xl': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',

                // Medium shadows
                'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'medium-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

                // Strong shadows
                'strong': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                'strong-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

                // Colored shadows
                'glow': '0 0 20px rgba(245, 184, 0, 0.3)',
                'glow-lg': '0 0 40px rgba(245, 184, 0, 0.4)',
                'glow-primary': '0 0 20px rgba(13, 59, 46, 0.3)',
                'glow-primary-lg': '0 0 40px rgba(13, 59, 46, 0.4)',

                // Inner shadows
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                'inner-medium': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            },

            // Border Radius - More refined
            borderRadius: {
                'none': '0',
                'sm': '0.25rem',
                'DEFAULT': '0.5rem',
                'md': '0.5rem',
                'lg': '0.75rem',
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
                'full': '9999px',
            },

            // Spacing - Consistent with design system
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
                '72': '18rem',
                '84': '21rem',
                '96': '24rem',
            },

            // Animation - Smooth and modern
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
                'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.4s ease-out forwards',
                'slide-down': 'slideDown 0.4s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-soft': 'bounceSoft 2s infinite',
                // New animations
                'spin-slow': 'spin 8s linear infinite',
                'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
                'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
                'gradient-shift': 'gradientShift 8s ease infinite',
            },

            // Keyframes
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '25%': { transform: 'translateY(-10px)' },
                    '50%': { transform: 'translateY(-5px)' },
                    '75%': { transform: 'translateY(-8px)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                kenBurns: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.1) translate(-2%, -1%)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },

            // Backdrop blur
            backdropBlur: {
                'xs': '2px',
            },

            // Z-index
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },

            // Aspect ratio
            aspectRatio: {
                '4/3': '4 / 3',
                '3/2': '3 / 2',
                '3/4': '3 / 4',
                '2/3': '2 / 3',
                '16/9': '16 / 9',
                '9/16': '9 / 16',
            },

            // Max width
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },

            // Transition duration
            transitionDuration: {
                '400': '400ms',
            },

            // Letter spacing
            letterSpacing: {
                'tighter': '-0.05em',
                'tight': '-0.025em',
                'normal': '0em',
                'wide': '0.025em',
                'wider': '0.05em',
                'widest': '0.1em',
            },
        },
    },
    plugins: [],
}
