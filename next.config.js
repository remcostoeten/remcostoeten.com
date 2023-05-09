module.exports = {
	async redirects() {
	  return [
		{
		  source: '/sveltekit',
		  destination: '/sveltekit/',
		  permanent: true,
		},
	  ];
	},
	images: {
	  domains: ['storage.googleapis.com'],
	},
  };
  