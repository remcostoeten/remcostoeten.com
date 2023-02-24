import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import data from './remcostoeten-private-apiroutes/proper/d100-200.json';
function DaphneFull({ handleKeyDown }) {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(data);

	const filter = (e: { target: { value: any } }) => {
		const keyword = e.target.value;

		const handleChange = (event) => {
			setname(event.target.value);
		};
		const handleKeyDown = (event) => {
			if (event.key === 'Enter') {
				handleAdd();
			}
		};
		setName(keyword);
	};

	let myClass = 'class1';

	const setClass = () => {
		data.forEach((item: { percent: number }) => {
			if (item.message.includes('remco')) myClass = 'class3';
			console.log('a');
		});
	};

	return (
		<>
			<div className='chat'>
				<div className='chat__side-panel'>
					<input
						className='search'
						onKeyDown={handleKeyDown}
						placeholder='zoeken'
						onChange={(e) => setSearch(e.target.value)}></input>
				</div>
				<div className='flex-wrap customers'>
					{data.chat
						.filter((item) => {
							return search.toLowerCase() == ''
								? item
								: item.message.toLowerCase().includes(search);
							<>
								<div className='btn btn--primary'>btn</div>
							</>;
						})
						.map((item, idx) => (
							<div key={idx}>{item.message}</div>
						))}
					aa
				</div>
			</div>
		</>
	);
}

export default DaphneFull;
