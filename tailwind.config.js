/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundColor: {
				f1f3f9: '#f1f3f9',
				'1462ff': '#1462ff',
				191919: '#191919',
			},
			fontSize: {
				xxs: ['10px'],
				xs: ['12px'],
				s: ['14px'],
				m: ['16px'],
				xxl: ['40px'],
				xxxl: ['50px'],
				xxxxl: ['60px'],
			},
			boxShadow: {
				custom: '0 6px 30px -10px rgba(74, 116, 201, 1)',
			},
			width: {
				1024: '1024px',
			},
			colors: {
				'dark-3': '#3f3d56',
				'off-pink': '#865c6c',
				'body-black': '#191919',
				'login-pink': '#f2ced8',
				'off-white': '#e4e7ec',
			},
			darkMode: 'dark',

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				art: "url('/art.jpg')",
			},
		},
	},
	plugins: [],
};
