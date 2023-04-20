import { NextSeo } from 'next-seo';

const Seo = ({ title, description, url, imageUrl }) => {
	return (
		<NextSeo
			title={title}
			description={description}
			openGraph={{
				type: 'website',
				url,
				title,
				description,
				images: imageUrl
					? [
							{
								url: imageUrl,
								width: 800,
								height: 600,
								alt: description,
							},
					  ]
					: [],
			}}
		/>
	);
};

export default Seo;
