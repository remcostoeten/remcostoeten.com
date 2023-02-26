import React, { useState } from 'react';
import { chatDisplayData } from '../api/chatDisplayData';
import { auth, db, singInWithGoogle, logout } from '../../firebase';

function chatDisplay() {
	const isLoggedIn = auth.currentUser;
	const [search, setSearch] = useState('');
function userToClass(chatDisplayData){
   var userClass = '';
   if(chatDisplayData === 'You') {
      userClass = 'left';
   }
   else 
      userClass = 'right';
   }
}
	return (
		<div className='chat'>
			<div className='chat__side-panel'>
				<input
					className='search'
					placeholder='zoeken'
					onChange={(e) => setSearch(e.target.value)}></input>
			</div>
			{isLoggedIn ? <h2>Logged in</h2> : <h3>Not loggedin</h3>}

			<div className='chat__chat-panel chat-history'>
				<div className='chat-history__inner'>
					{chatDisplayData.chat
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

export default chatDisplay;
