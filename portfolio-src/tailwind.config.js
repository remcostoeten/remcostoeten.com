/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'offWhite': '#e4e7ec',
          'offBlack': '#202328',
          'blackAlternative': '#121212',
      },
      fontSize: {
        xxs: ['10px'],
        xs: ['12px'],
        sm: ['14px'],
        md: ['16px'],
        lg: ['18px'],
        xxl: ['40px'],
        xxxl: ['50px'],
        xxxxl: ['60px'],
      },
      padding: { 
        'xxs': '0.125rem', //8px'
        'small': '0.1875rem', //12px
        'regular': '0.0625rem', //16px
        'medium': '0.09375rem', //24px
        'large': '0.125rem', //32px
      },
    },
  },
  plugins: [],
}
