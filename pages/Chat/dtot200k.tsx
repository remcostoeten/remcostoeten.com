import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import data from './remcostoeten-private-apiroutes/proper/d100-200.json';
function DaphneFull() {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(data);

	const filter = (e: { target: { value: any } }) => {
		const keyword = e.target.value;
		const handleChange = (event: any) => {
			setName(event.target.value);
		};
		setName(keyword);
	};

	return (
		<>
			<div className='chat'>
				<div className='chat__side-panel'>
					<input
						className='search'
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
