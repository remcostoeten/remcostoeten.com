const withTM = require('next-transpile-modules')(['react-pdf', 'json-loader']);
const withSitemap = require('next-sitemap');
const withOptimizedImages = require('next-optimized-images');

module.exports = withSitemap(
	withOptimizedImages(
		withTM({
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
								presets: [
									'@babel/preset-env',
									'@babel/preset-react',
								],
							},
						},
					],
				});

				return config;
			},

			siteUrl: 'https://www.remcostoeten.com',
			generateRobotsTxt: true,
			exclude: ['/404'],
			robotsTxtOptions: {
				additionalSitemaps: [
					'https://www.remcostoeten.com/sitemap.xml',
				],
			},

			optimizeImages: true,
			optimizeImagesInDev: false,
			handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
			responsive: {
				adapter: require('responsive-loader/sharp'),
				sizes: [320, 420, 768, 1024, 1200],
				placeholder: true,
				placeholderSize: 14,
			},
		}),
	),
);
