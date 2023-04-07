import { NextSeo } from 'next-seo';

interface SeoProps {
	title: string;
	description: string;
	url: string;
	imageUrl?: string;
}

const Seo = ({ title, description, url, imageUrl }: SeoProps) => {
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
