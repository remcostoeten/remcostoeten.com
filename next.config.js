const withTM = require('next-transpile-modules')(['react-pdf', 'json-loader']);

module.exports = withTM({
	images: {
		domains: ['lh3.googleusercontent.com'],
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
