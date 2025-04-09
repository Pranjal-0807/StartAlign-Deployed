/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            animation: {
                gradient: 'gradientAnimation 10s ease infinite',
                bubble: 'bubbleMove 25s linear infinite',
            },
            keyframes: {
                gradientAnimation: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                bubbleMove: {
                    '0%': { transform: 'translateY(0) translateX(0)' },
                    '100%': { transform: 'translateY(-1000px) translateX(300px)' },
                },
            },
        },
    },
    plugins: [],
};
