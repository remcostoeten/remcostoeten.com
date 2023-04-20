import { NextSeo } from 'next-seo';
import React from 'react';

export default function Seo(title, description, url, imageUrl) {
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
}
