/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        'page-height': '296.85mm', // 1121.57px
        'page-width': '210mm', // 793.7px
        '13'  : '3.25rem',    // 52px
        '15'  : '3.75rem',    // 60px
        '18'  : '4.5rem',     // 72px
        '22'  : '5.5rem',     // 88px
        '25'  : '6.25rem',    // 100px
        '26'  : '6.5rem',     // 104px
        '30'  : '7.5rem',     // 120px
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 