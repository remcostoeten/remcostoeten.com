import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/ChatSearch';
import { ChatMessage, Attachment, Message } from '../../types';

const getChatHistory = (): ChatMessage[] => {
	const chatHistoryRaw: any[] = require('../whatsapp-export/ChatHistory.json');
	return chatHistoryRaw.map((msg: any): ChatMessage => {
		const { attachments, sender, timestamp, message } = msg;

		return {
			id: 'dummy-id',
			message: message,
			type: message.type === 'sent' ? 'sent' : 'received',
			attachments:
				attachments && Array.isArray(attachments)
					? attachments.map(
							(att: any): Attachment => ({
								id: 'dummy-id',
								type: att.type,
								data: att.data,
							}),
					  )
					: [],
			sender,
			timestamp: new Date(timestamp),
		};
	});
};

const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<Message[]>([]);
	const [chatHistory, setChatHistory] = useState<Message[]>([]);

	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		const chatHistoryRaw: ChatMessage[] = getChatHistory();
		const messageHistory: Message[] = chatHistoryRaw.map((chatMessage) => ({
			...chatMessage,
			timestamp: new Date(chatMessage.timestamp),
		}));
		setChatHistory(messageHistory);
	}, []);

	const handleSearch = (term: string) => {
		if (term.length > 0) {
			const results = chatHistory
				.filter((message: Message) =>
					message.message.toLowerCase().includes(term),
				)
				.map((message: Message) => message as ChatMessage);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};
	const handleJumpTo = (message?: ChatMessage) => {
		const index = message
			? chatHistory.findIndex((m) => m.timestamp === message.timestamp)
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
				searchResults={searchResults as unknown as ChatMessage[]}
				onJumpTo={(index: number) => handleJumpTo(searchResults[index])}
				chatHistory={chatHistory}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{chatHistory &&
						chatHistory.map((message: Message, index: number) => (
							<div
								className={`bubble__message ${
									message.sender
										.toLowerCase()
										.includes('alice')
										? 'bubble__second-person'
										: ''
								}`}
								key={message.timestamp.getTime()}>
								<div id={`chat-message-${index}`}>
									<p>
										<span>
											<div className='chat__sender'>
												{message.sender}
											</div>
											<div className='chat__message'>
												{message.message}
											</div>
										</span>

										<div className='bubble__attachments'>
											<span>
												{message.attachments?.photo !==
												undefined
													? `Photo: ${message.attachments?.photo}`
													: undefined}
											</span>{' '}
											<span>
												{message.attachments?.format !==
												undefined
													? `Format: ${message.attachments?.format}`
													: undefined}
											</span>
											<span>
												{message.attachments?.device !==
												undefined
													? `Device: ${message.attachments?.device}`
													: undefined}
											</span>
										</div>
									</p>
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default ChatHistory;
