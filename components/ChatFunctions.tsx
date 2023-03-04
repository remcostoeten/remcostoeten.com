import React, { useEffect } from 'react';

export default function ChatFunctions() {
	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				document.body.classList.add('scrolled');
			} else {
				document.body.classList.remove('scrolled');
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return <div>ChatFunctions</div>;
}
