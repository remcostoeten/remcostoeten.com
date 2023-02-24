import React, { useState } from 'react';
import { daphData } from './dData20k';
import { zeenaNewData } from './zeenaNewwData';
function Zeena() {
	const [search, setSearch] = useState('');
	return (
		<div className='chat'>
			<div className='chat__side-panel'>
				<input
					className='search'
					placeholder='zoeken'
					onChange={(e) => setSearch(e.target.value)}></input>
			</div>
			<div className='chat__chat-panel chat-history'>
				<div className='chat-history__inner'>
					{zeenaNewData.chat
						.filter((item) => {
							return search.toLowerCase() == ''
								? item
								: item.message.toLowerCase().includes(search);
							<>
								<div className='btn btn--primary'>btn</div>
							</>;
						})
						.map((item) => (
							<div className='bubble__message'>
								<div className='bubble__bg'>{item.message}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default Zeena;
