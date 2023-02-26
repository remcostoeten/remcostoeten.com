import Dnav from '@/components/header/Dnav';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import data from './remcostoeten-private-apiroutes/proper/0-100k.json';
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
			<Dnav />
			<div className='chat'>
				<div className='chat__side-panel'>
					<input
						className='search'
						onChange={(e) => setSearch(e.target.value)}
						placeholder='zoeken'></input>
				</div>
				<div className='chat__chat-panel chat-history'>
					<div className='chat-history__inner'></div>
					{data.chat
						.filter((item: { message: string }) => {
							return search.toLowerCase() == ''
								? item
								: item.message.toLowerCase().includes(search);
							<>
								<div className='btn btn--primary'>btn</div>
							</>;
						})
						.map(
							(
								item: {
									message:
										| string
										| number
										| boolean
										| React.ReactElement<
												any,
												| string
												| React.JSXElementConstructor<any>
										  >
										| React.ReactFragment
										| React.ReactPortal
										| null
										| undefined;
								},
								idx: React.Key | null | undefined,
							) => (
								<div className='bubble__message' key={idx}>
									{item.message}
								</div>
							),
						)}
				</div>
			</div>
		</>
	);
}

export default DaphneFull;
