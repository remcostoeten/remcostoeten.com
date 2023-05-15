/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      padding: {
        'xxs': '0.125rem', //8px'        
        'small': '0.1875rem', //12px
        'regular': '0.0625rem', //16px
        'medium': '0.09375rem', //24px
        'large': '0.125rem', //32px
    },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'offWhite': '#e4e7ec',
          'offBlack': '#202328',
      },
    },
  },
  plugins: [],
}
