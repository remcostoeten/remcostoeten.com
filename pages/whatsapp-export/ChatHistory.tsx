import React, { useState, useEffect } from 'react';
import chatData from '../api/chatDisplayData.json';

interface Message {
	sender: string;
	timestamp: string;
	message: string;
}

interface ChatHistoryProps {
	chatData: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatData }) => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<number[]>([]);
	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {};
		document.body.classList.remove('chat-ui');
	}, []);
	useEffect(() => {
		setChatHistory(chatData);
	}, [chatData]);

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

	return (
		<div className='chat'>
			<aside className='chat__aside'>
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
			<div className='chat__chat-panel chat-history'>
				{chatHistory.map((message: Message, index: number) => (
					<div
						className={`bubble__message ${
							message.sender.toLowerCase().includes('alice')
								? 'bubble__second-person'
								: ''
						}`}
						key={message.timestamp}>
						<div id={`chat-message-${index}`}>
							<p>
								{message.sender}: {message.message}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatHistory;
