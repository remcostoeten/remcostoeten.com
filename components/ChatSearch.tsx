import React, { useEffect, useState } from 'react';
import ChatData from '../pages/whatsapp-export/ChatHistory.json';

interface Message {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
}

function ChatSearch() {
	const [searchOpen, setMenuOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const [searchResults, setSearchResults] = useState<number[]>([]);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});
	useEffect(() => {
		setChatHistory(ChatData);
	}, [ChatData]);
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		if (term.length > 0) {
			const results = chatHistory
				.filter((message: Message) =>
					message.message.toLowerCase().includes(term),
				)
				.map((message: Message, index: number) => index);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	const handleJumpTo = (index: number) => {
		const element = document.getElementById(`chat-message-${index}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 768 && searchOpen) {
			setMenuOpen(false);
		}
	}, [size.width, searchOpen]);

	const searchToggleHandler = () => {
		setMenuOpen((p) => !p);
		document.body.classList.add('searchOpen');
	};
	useEffect(() => {
		if (searchOpen === false) {
			document.body.classList.remove('searchOpen');
		}
	});
	return (
		<div className='search__content'>
			<div className='search__toggle'>
				{!searchOpen ? (
					<div className='offcanvas' onClick={searchToggleHandler}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='32'
							height='32'
							fill='#fff'
							className='bi bi-search'
							viewBox='0 0 16 16'>
							<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'></path>
						</svg>
					</div>
				) : (
					<aside>
						<input
							type='text'
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder='Search chat history'
						/>
						{searchTerm.length > 0 && (
							<div className='chat__results'>
								{searchResults.map((index) => (
									<button
										key={index}
										onClick={() => handleJumpTo(index)}>
										Jump to result {index + 1}
									</button>
								))}
							</div>
						)}

						<div onClick={searchToggleHandler}>Close search</div>
					</aside>
				)}
			</div>
		</div>
	);
}

export default ChatSearch;
