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
		<div>
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder='Search chat history'
			/>
			{searchTerm.length > 0 && (
				<div>
					{searchResults.map((index) => (
						<button key={index} onClick={() => handleJumpTo(index)}>
							Jump to result {index + 1}
						</button>
					))}
				</div>
			)}
			{chatHistory.map((message: Message, index: number) => (
				<div key={message.timestamp} id={`chat-message-${index}`}>
					<p>
						{message.sender}: {message.message}
					</p>
				</div>
			))}
		</div>
	);
};

export default ChatHistory;
