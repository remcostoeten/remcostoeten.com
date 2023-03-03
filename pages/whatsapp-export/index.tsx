import React, { useEffect, useState } from 'react';
import ChatSearch from '../../components/ChatSearch';
import { ChatMessage, Attachment } from '../../types';

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

const ChatHistory: React.FC = () => {
	const [bodyClass, setBodyClass] = useState('');
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [showFullText, setShowFullText] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [showFullContent, setShowFullContent] = useState(false);
	const text =
		"Feature for me to practice hooks and other react/nextJS features. On WhatsApp there's the possibility to export your chats which generates a plain .txt. I converted the txt to JSON objects (some chats had almost up to a million lines). Once converted to JSON I fetched the data, mapped over it and displayed it here. Besides that, I've added a search through the map functionality. Initially, it was a filter functionality, but I much prefer a jump to toggle like this. Also had to come up with a solution for mobile since there's little space and flex-direction row wouldn't work so I've made it that the search is toggleable in an off-canvas menu. It used to be 35% width 100%^height and absolute but due to the toggleable anchors I had to make it sticky, not the pretiest regarding relative styling but it'll do. Code can be found here. The WhatsApp export is private for obvious reasons but to showcase the feature, I've made a dummy JSON containg random chat messages.";
	const handleReadMoreClick = () => {
		setShowFullText(true);
	};
	const handleReadLessClick = () => {
		setShowFullText(false);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
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
		const chatHistoryRaw: ChatMessage[] = getChatHistory();
		const messageHistory: ChatMessage[] = chatHistoryRaw.map(
			(chatMessage) => ({
				...chatMessage,
				timestamp: new Date(chatMessage.timestamp),
			}),
		);
		setChatHistory(messageHistory);
	}, []);

	const handleSearch = (term: string) => {
		if (term.length > 0) {
			const results = chatHistory.filter((message: ChatMessage) =>
				message.message.toLowerCase().includes(term),
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	};

	const handleJumpTo = (message?: ChatMessage) => {
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
			<article>
				<p>
					{showFullText ? text : `${text.slice(0, 150)}...`}
					{!showFullText && (
						<a onClick={handleReadMoreClick}>Read more</a>
					)}
					{showFullText && (
						<a onClick={handleReadLessClick}>Read less</a>
					)}
				</p>
			</article>
			<ChatSearch
				onSearch={handleSearch}
				searchResults={searchResults}
				onJumpTo={(index: number) => handleJumpTo(searchResults[index])}
				chatHistory={chatHistory}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{chatHistory &&
						chatHistory.map(
							(message: ChatMessage, index: number) => (
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
										</p>
									</div>
								</div>
							),
						)}
				</div>
			</div>
		</>
	);
};

export default ChatHistory;
