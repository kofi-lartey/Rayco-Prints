/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // ============================================
                // RAYCOPRINTS BRAND COLORS
                // ============================================

                // Main Brand Colors
                // Deep Forest Green - Primary background (header, footer, main sections)
                'rayco-forest': '#004324',

                // Golden Yellow - Action buttons (Order Now, Chat on WhatsApp)
                'rayco-gold': '#FFB800',

                // Secondary & Accent Colors
                // Pure White - Body text and Services descriptions
                'rayco-white': '#FFFFFF',

                // Safety Orange - Logo swoosh highlights, icons, secondary buttons
                'rayco-orange': '#F37021',

                // Sky Blue - Digital/software icons, Online Services labels
                'rayco-sky': '#00ADEF',

                // Dark Sage Green - "Without Light" sidebar, alert boxes, special notices
                'rayco-sage': '#005C32',

                // Legacy colors (keeping for backward compatibility)
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
                    DEFAULT: '#004324', // Deep Forest Green
                },
                // Golden Yellow for CTAs
                golden: {
                    50: '#fff8e6',
                    100: '#ffefcc',
                    200: '#ffdf99',
                    300: '#ffcf66',
                    400: '#ffbf33',
                    500: '#FFB800', // Golden Harvest Yellow
                    600: '#cc9300',
                    700: '#996e00',
                    800: '#664a00',
                    900: '#332500',
                },
                // Sky Blue Accent
                sky: {
                    50: '#e8f5fb',
                    100: '#d1ebf7',
                    200: '#a3d7ef',
                    300: '#75c3e7',
                    400: '#47afdf',
                    500: '#00ADEF', // Sky Blue Accent (updated)
                    600: '#008abd',
                    700: '#00678c',
                    800: '#00445c',
                    900: '#00222b',
                },
                // Charcoal Black
                charcoal: {
                    DEFAULT: '#1A1A1A',
                },
                // Keep royal as fallback
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
            fontFamily: {
                'heading': ['Inter', 'system-ui', 'sans-serif'],
                'body': ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
