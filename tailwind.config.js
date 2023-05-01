/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			width: {
				1024: '1024px',
			},
			colors: {
				'off-pink': '#865c6c',
				'login-pink': '#f2ced8',
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
