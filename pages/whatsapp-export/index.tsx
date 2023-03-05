import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/ChatSearch';
import { ChatMessage } from '@/types';
import Bubble from '@/components/chathistory/Bubble';

const getChatHistory = () => {
	const chatHistoryRaw = require('./ChatHistory.json');
	return chatHistoryRaw.map((msg) => {
		const { attachments, sender, timestamp, message } = msg;
		return {
			id: 'dummy-id',
			message,
			type: message.type === 'sent' ? 'sent' : 'received',
			attachments:
				attachments && Array.isArray(attachments)
					? attachments.map((att) => {
							const { photo, format, device } = att;
							return {
								id: 'dummy-id',
								type: att.type,
								data: att.data,
								photo: photo || '',
								format: format || '',
								device: device || '',
							};
					  })
					: [],
			sender,
			timestamp: new Date(timestamp),
		};
	});
};

const ChatHistory = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [chatHistory, setChatHistory] = useState([]);

	const handleSearch = (term) => {
		if (term.length > 0) {
			const results = chatHistory.filter((message) =>
				message.message.toLowerCase().includes(term),
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

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

	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		const chatHistoryRaw = getChatHistory();
		const messageHistory = chatHistoryRaw.map((chatMessage) => ({
			...chatMessage,
			timestamp: new Date(chatMessage.timestamp),
		}));
		setChatHistory(messageHistory);
	}, []);

	return (
		<div className='chat-history'>
			<ChatSearch
				onSearch={handleSearch}
				searchResults=''
				chatHistory={[]}
				onJumpTo={() => {
					throw new Error('Function not implemented.');
				}}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{searchResults.length > 0
						? searchResults.map((message) => (
								<Bubble
									key={message.id}
									message={message}
									index={0}
								/>
						  ))
						: chatHistory.map((message) => (
								<Bubble
									key={message.id}
									message={message}
									index={0}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
};

export default ChatHistory;
