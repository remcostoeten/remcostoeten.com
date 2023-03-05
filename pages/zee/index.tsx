import FeatureStory from '@/components/chathistory/Article';
import React, { useEffect, useState } from 'react';
import ChatSearch from '../../components/ChatSearch';
import { ChatMessage, Attachment } from '../../types';
const getChatHistory = (): ChatMessage[] => {
	const chatHistoryRaw: any[] = require('../../apisprivate/ZeenaNewwData.json');
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
			sender: sender || '', // add a check for the sender property
			timestamp: new Date(timestamp),
		};
	});
};
const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [showFullText, setShowFullText] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [showFullContent, setShowFullContent] = useState(false);
	const githubLink =
		'https://github.com/remcostoeten/remcostoeten.com/blob/develop/pages/whatsapp-export/index.tsx';

	<FeatureStory />;

	const handleReadMoreClick = () => {
		setShowFullText(true);
	};
	const handleReadLessClick = () => {
		setShowFullText(false);
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

	interface ChatSearchProps {
		onSearch: (query: string) => void;
		searchResults: string;
		onJumpTo: (message: ChatMessage) => void;
		chatHistory: ChatMessage[];
	}

	return (
		<>
			<FeatureStory />
			<ChatSearch
				onSearch={handleSearch}
				onJumpTo={(index: number) => handleJumpTo(searchResults[index])}
				chatHistory={chatHistory}
				searchResults={''}
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
