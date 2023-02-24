import React, { useState } from 'react';
import chatDisplayData from '../api/chatDisplayData';

export default function ChatTest() {
	const [data, setData] = useState(() =>
		Array.from({ length: 10 }, chatDisplayData),
	);

	const reverse = () => {
		setData((data) => data.slice().reverse());
	};

	return (
		<main>
			<button onClick={reverse}>Reverse</button>
			<ul
				style={{
					width: '400px',
					height: '700px',
					overflowY: 'scroll',
				}}>
				{data.map((chatDisplayData, i) => (
					<li style={{ height: '20px' }} key={i + chatDisplayData}>
						{chatDisplayData}
					</li>
				))}
			</ul>
		</main>
	);
}
