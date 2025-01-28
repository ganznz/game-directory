/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // colour variables defined in app.css
                'light-bg': 'var(--color-light-bg)',
                'light-primary': 'var(--color-light-primary)',
                'light-secondary': 'var(--color-light-secondary)',
                'light-text': 'var(--color-light-text)',
                'light-accent': 'var(--color-light-accent)',
                'dark-bg': 'var(--color-dark-bg)',
                'dark-primary': 'var(--color-dark-primary)',
                'dark-secondary': 'var(--color-dark-secondary)',
                'dark-text': 'var(--color-dark-text)',
                'dark-accent': 'var(--color-dark-accent)',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
}