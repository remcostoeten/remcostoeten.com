const withTM = require('next-transpile-modules')(['json-loader']);

module.exports = withTM({
	webpack: (config) => {
		config.module.rules.push({
			test: /\.json$/,
			loader: 'json-loader',
			type: 'javascript/auto',
		});

		return config;
	},
});
