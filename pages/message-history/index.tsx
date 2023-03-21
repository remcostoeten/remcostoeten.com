import React, { useEffect } from 'react';
import Friends from '@/components/Messenger/Friends';
// import Header from '@/components/Header/Header';
import withAuth from '../withAuth';

const MessengerPage = () => {
	useEffect(() => {
		document.body.classList.add('messenger-ui');
		return () => {
			document.body.classList.remove('messenger-ui');
		};
	}, []);

	return (
		<>
			{/* <Header /> */}
			<div className='messenger'>
				<aside className='messenger__friends'>
					<h2>Inbox</h2>
					<Friends />

					<nav></nav>
				</aside>
				<main className='messenger__chat'></main>
			</div>
		</>
	);
};

export default withAuth(MessengerPage);
