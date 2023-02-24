import Link from 'next/link';
import React, { useState } from 'react';
import { daphData } from './remcostoeten-private-apiroutes/dData200k';
import { auth, db, singInWithGoogle, logout } from '../../firebase';
import data from './data.json';

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
				<div className='flex-wrap'>
					{' '}
					{data.chat.map((item, idx) => (
						<div key={idx}>{item.message}</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Daphne;
