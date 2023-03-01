import Dnav from '@/components/header/Dnav';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import data from '../../apis-private/proper/0-100k.json';

function DaphneFull({ handleKeyDown }) {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(data);

	const handleChangee = () => {
		console.log('aaa');
	};

	const filter = (e: { target: { value: any } }) => {
		const keyword = e.target.value;

		const handleChange = (event) => {
			setname(event.target.value);
		};
		const handleKeyDown = (event) => {
			console.log('a');
		};
		setName(keyword);
	};

	let myClass = 'class1';

	const setClass = () => {
		data.forEach((item: {}) => {
			if (data.includes('remco')) myClass = 'class3';
			console.log('a');
		});
	};

	return (
		<>
			<Dnav />
			<div className='chat'>
				<div className='chat__side-panel'>
					<input
						className='search'
						onKeyDown={handleKeyDown}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='zoeken'></input>
				</div>
				<div className='chat__chat-panel chat-history'>
					{data.chat
						.filter((item) => {
							return search.toLowerCase() === ''
								? item
								: item.message.toLowerCase().includes(search);
						})
						.map((item, idx) => (
							<div
								className={`bubble__message ${
									item.message
										.toLowerCase()
										.includes('daphne hoitzing')
										? 'bubble__second-person'
										: ''
								}`}
								key={idx}>
								{item.message}
							</div>
						))}
				</div>
			</div>
		</>
	);
}

export default DaphneFull;
