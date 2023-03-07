<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/ChatSearch';
import { ChatMessage } from '@/types';
import Bubble from '@/components/chathistory/Bubble';

const getChatHistory = () => {
	const chatHistoryRaw = require('./ChatHistory.json');
	return chatHistoryRaw.map((msg) => {
=======
import FeatureStory from '@/components/Chat/Article';
import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/Chat/ChatSearch';
import { ChatMessage } from '@/types';
import Header from '@/components/Chat/Header';
const getChatHistory = (): ChatMessage[] => {
	const chatHistoryRaw: any[] = require('../whatsapp-export/ChatHistory.json');
	return chatHistoryRaw.map((msg: any): ChatMessage => {
>>>>>>> 1abbd673ff6afe44b08d9932d03caa3ae6838ee1
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

<<<<<<< HEAD
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
=======
const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [showFullText, setShowFullText] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [showFullContent, setShowFullContent] = useState(false);

	const handleReadMoreClick = () => {
		setShowFullText(true);
	};
	const handleReadLessClick = () => {
		setShowFullText(false);
>>>>>>> 1abbd673ff6afe44b08d9932d03caa3ae6838ee1
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

	interface ChatSearchProps {
		onSearch: (query: string) => void;
		searchResults: string;
		onJumpTo: (message: ChatMessage) => void;
		chatHistory: ChatMessage[];
	}

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
												<div className='chat__image'>
													{/* <Image */}
													{/* src={message.image} */}
													{/* /> */}
												</div>
												<div className='chat__sender'>
													{message.name}
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
		</div>
	);
};

export default ChatHistory;
