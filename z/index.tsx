import React, { ReactNode, useEffect, useState } from 'react';
import { Chat, Attachment, ChatMessage } from '../../types';
import ChatSearch from '@/components/ChatSearch/ChatSearch';
const getChatHistory = (): ChatMessage[] => {
	const chatHistoryRaw: any[] = require('../../apisprivate/proper/znewdata.json');
	console.log(typeof chatHistoryRaw);
};

const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [chatHistory, setChatHistory] = useState<Chat[]>([]);

	useEffect(() => {
		document.body.classList.add('chat-ui');
		document.body.classList.add('chat-');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	const handleSearch = (term: string) => {
		if (term.length > 0) {
			const results = chatHistory.filter((message: Chat) =>
				message.message
					.toString()
					.toLowerCase()
					.includes(term.toLowerCase()),
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	useEffect(() => {
		const chatHistoryRaw: Chat[] = getChatHistory();
		const messageHistory: Chat[] = chatHistoryRaw.map((chatMessage) => ({
			...chatMessage,
			timestamp: new Date(chatMessage.timestamp),
		}));
		setChatHistory(messageHistory);
	}, []);

	const handleJumpTo = (message?: Chat) => {
		const index =
			message && message.timestamp
				? chatHistory.findIndex(
						(m) => m.timestamp === message.timestamp,
				  )
				: -1;
		const messageElement = document.getElementById(`chat-message-${index}`);
		if (messageElement) {
			messageElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<ChatSearch
				onSearch={handleSearch}
				onJumpTo={(index: number) => handleJumpTo(searchResults[index])}
				chatHistory={chatHistory}
				searchResults={searchResults}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					<div className='chat-history__inner'></div>
		{data.chat
				
						.map((item, idx) => (
							<div className='bubble__message' key={idx}>
								{item.message}
							</div>
						))
				</div>
			</div>
		</>
	);
};

export default ChatHistory;
