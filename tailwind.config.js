/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx,html}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['"Public Sans"', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            colors: {
                primary: {
                    DEFAULT: '#2b6cee', // Blue for Step 1
                    green: '#13ec13',   // Green for Step 2
                    teal: '#10b77f',    // Teal for Evidence
                    dark: '#0f172a',
                    surface: '#1e293b'
                }
            }
        },
    },
    plugins: [],
}
