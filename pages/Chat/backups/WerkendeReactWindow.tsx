import React from 'react';
import { VariableSizeList as List } from 'react-window';

const rowSizes = new Array(1000000)
	.fill(true)
	.map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = (index) => rowSizes[index];

const Row = ({ index, style }) => (
	<div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
		Row {index}
	</div>
);

const ChatTest = () => {
	const [data, setData] = useState(() =>
		Array.from({ length: 10000 }, faker.address.city),
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
				{data.map((city, i) => (
					<li style={{ height: '20px' }} key={i + city}>
						{city}
					</li>
				))}
			</ul>
		</main>
	);
};
