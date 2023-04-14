const withTM = require('next-transpile-modules')(['react-pdf', 'json-loader']);

module.exports = withTM({
	images: {
		domains: ['lh3.googleusercontent.com'],
	},
	env: {
		MY_EMAIL: process.env.MY_EMAIL,
		MY_EMAIL_SECONDARY: process.env.MY_EMAIL_SECONDARY,
		LINK_ONE: process.env.LINK_ONE,
		LINK_TWO: process.env.LINK_TWO,
		LINK_THREE: process.env.LINK_THREE,
		LINK_FOUR: process.env.LINK_FOUR,
		ADMIN: process.env.ADMIN,
		FB_API: process.env.FB_API,
		FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
		FB_PROJECT_ID: process.env.FB_PROJECT_ID,
		FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
		FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
		FB_APP_ID: process.env.FB_APP_ID,
		FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.json$/,
			loader: 'json-loader',
			type: 'javascript/auto',
		});

		config.module.rules.push({
			test: /\.(js|jsx)$/,
			include: [/react-pdf/],
			use: [
				options.defaultLoaders.babel,
				{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			],
		});

		return config;
	},
});
