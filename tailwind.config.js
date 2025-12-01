/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#09090b', // Zinc 950
                surface: '#18181b', // Zinc 900
                primary: '#22c55e', // Green 500
                secondary: '#3b82f6', // Blue 500
                accent: '#f59e0b', // Amber 500
                danger: '#ef4444', // Red 500
                muted: '#71717a', // Zinc 500
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
