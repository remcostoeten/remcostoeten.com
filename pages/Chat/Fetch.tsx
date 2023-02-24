import { useState } from 'react';
import data from './data.json';

export default function Fetch() {
	const [page, perPage] = useState('');
	return (
		<div>
			{data.chat
				.slice(page * per_page, (page + 1) * per_page)
				.map((item, idx) => (
					<p key={idx}>{item.message}</p>
				))}
		</div>
	);
}
