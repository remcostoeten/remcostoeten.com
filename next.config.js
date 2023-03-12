const withTM = require('next-transpile-modules')(['json-loader']);

module.exports = withTM({
	images: {
		domains: ['lh3.googleusercontent.com'],
	    domains: ['lh3.googleusercontent.com'],
	},
	pack: (config) => {
		config.module.rules.push({
			test: /\.json$/,
			loader: 'json-loader',
			type: 'javascript/auto',
		});

		return config;
	},
});
