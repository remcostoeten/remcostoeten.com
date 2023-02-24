import Link from 'next/link';
import React, { useState } from 'react';
import { daphData } from './remcostoeten-private-apiroutes/dData100k';
import { auth, db, singInWithGoogle, logout } from '../../firebase';

function Daphne() {
	const [search, setSearch] = useState('');
		const isLoggedIn = auth.currentUser;

	return (
		<>

			<div className='chat'>
				<div className='chat__side-panel'>
					<input
						className='search'
						placeholder='zoeken'
						onChange={(e) => setSearch(e.target.value)}></input>
				</div>
				<div className='chat__chat-panel chat-history'>
					<div className='chat-history__inner'>
						{daphData.chat
							.filter((item) => {
								return search.toLowerCase().slice(2) == '' && search.toUpperCase() == 'aaa'
									? item
									: item.message
											.toLowerCase()
											.includes(search);
								<>
									<div className='btn btn--primary'>btn</div>
								</>;
							})
							.map((item) => (
								<div className='bubble__message'>
											{isLoggedIn ? 			<div className='bubble__bg'>

										{item.message}
					</div>: <div></div>}

						
								</div>
							))}
					</div>
	
						))}
				</div>
			</div>
		</>
	);
}

export default Daphne;
