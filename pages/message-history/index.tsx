import React, { useEffect } from 'react';
import Friends from '@/components/Messenger/Friends';
import Header from '@/components/header/Header';

export default function index() {
	useEffect(() => {
		document.body.classList.add('messenger-ui');
		return () => {
			document.body.classList.remove('messenger-ui');
		};
	}, []);
	return (
		<>
			<Header />
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
}
