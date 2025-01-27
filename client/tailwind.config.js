/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    darkMode: ["class"],
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {}
        }
    },
    plugins: [require("tailwindcss-animate")],
    corePlugins: {
        preflight: false,
    },
}

