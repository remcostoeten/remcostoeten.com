import React, { useEffect, useState } from 'react';
import data from './remcostoeten-private-apiroutes/proper/znew.json';

interface Message {
	timestamp: string;
	sender: string;
	message: string;
}

function Znew() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<number[]>([]);
	const [chat, setChat] = useState<Message[]>([]);

	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		// Parse the sender name from the message string
		const parsedChat = data.chat.map((message) => {
			const sender =
				message.message.match(
					/^\[\d{2}\/\d{2}\/\d{4},\s\d{2}:\d{2}:\d{2}\]\s([\w\s]+):\s/,
				)?.[1] ?? '';
			return {
				timestamp: message.timestamp,
				sender,
				message: message.message,
			};
		});
		setChat(parsedChat);
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		if (term.length > 0) {
			const results = chat
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

	return (
		<>
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
			</aside>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{chat.map((message: ChatMessage, index: number) => (
						<div
							className={`bubble__message ${
								message.sender.toLowerCase().includes('remco')
									? ''
									: 'bubble__second-person z'
							}`}
							key={message.timestamp}>
							<div id={`chat-message-${index}`}>
								<p>{message.message}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Znew;
