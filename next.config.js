/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = {
	module: {
		siteUrl: 'https://remcostoeten.com',
		changefreq: 'daily',
		priority: 0.7,
		sitemapSize: 5000,
		generateRobotsTxt: true,
		exclude: ['/admin/**'],
	},
	images: {
		domains: ['storage.googleapis.com'],
	},
};
