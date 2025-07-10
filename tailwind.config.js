/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 8px rgba(0,0,0,0.03)',
        'card-hover': '0 6px 16px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [forms, typography],
}; 