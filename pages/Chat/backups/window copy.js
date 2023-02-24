import { useState } from 'react';
import { faker } from '@faker-js/faker';
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

export default function window() {
	const [data, setData] = useState(() =>
		Array.from({ length: 200 }, faker.address.city),
	);

	const reverse = () => {
		setData((data) => data.slice().reverse());
	};
	return (
		<>
			<button onClick={reverse}>revs</button>
			<ul>
				{data.map((city, i) => (
					<li style={{ height: '20px' }} key={i + city}>
						{city}
					</li>
				))}
			</ul>
		</>
	);
}
