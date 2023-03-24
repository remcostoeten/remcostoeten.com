import React, { useEffect, useState, useRef } from 'react';
import ChatSearch from '@/components/Chat/ChatSearch';
import Image from 'next/image';
import { ChatMessage } from '@/types';
import { storage } from '@/utils/firebase';
import { ref, getDownloadURL } from '@firebase/storage';

interface ChatHistoryProps {
	pageSize: number;
	filename: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ pageSize, filename }) => {
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const messagesPerPage = 200;
	const storageInstance = storage;
	const storageRef = ref(storageInstance, `/${filename}.json`);
	const currentMessages =
		searchTerm.length > 0 ? searchResults : visibleMessages;

	const fetchChatHistoryFromStorage = async (): Promise<ChatMessage[]> => {
		try {
			const chatHistoryUrl = await getDownloadURL(storageRef);
			const response = await fetch(chatHistoryUrl);
			const chatHistoryData = await response.json();
			return chatHistoryData;
		} catch (error) {
			console.error('Error fetching chat history:', error);
			return [];
		}
	};
	const handleLoadMore = () => {
		const nextPage = currentPage + 1;
		const startIndex = (nextPage - 1) * messagesPerPage;
		const endIndex = nextPage * messagesPerPage;
		const newVisibleMessages = [
			...visibleMessages,
			...chatHistory.slice(startIndex, endIndex),
		];
		setVisibleMessages(newVisibleMessages);
		setCurrentPage(nextPage);
	};

	useEffect(() => {
		document.body.classList.add('chat-ui');
		document.body.classList.add('private-chat');

		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		const fetchChatHistory = async () => {
			const chatHistoryData = await fetchChatHistoryFromStorage();
			const messageHistory: ChatMessage[] = chatHistoryData.map(
				(chatMessage: any) => ({
					...chatMessage,
					timestamp: new Date(chatMessage.timestamp),
				}),
			);
			setChatHistory(messageHistory);
			setVisibleMessages(messageHistory.slice(0, messagesPerPage));
			setIsLoading(false);
		};

		fetchChatHistory();
	}, []);

	useEffect(() => {
		setVisibleMessages(chatHistory.slice(0, messagesPerPage));
	}, [chatHistory]);

	// New states and ref
	const [jumpToIndex, setJumpToIndex] = useState<number | null>(null);
	const chatHistoryRef = useRef<HTMLDivElement>(null);

	// New jump-to button handler
	const handleJumpToMessage = () => {
		if (jumpToIndex !== null && chatHistoryRef.current) {
			const messageElement = chatHistoryRef.current.querySelector(
				`#unique-chat-message-${jumpToIndex}`,
			);
			if (messageElement) {
				messageElement.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};
  useEffect(() => {
		if (searchTerm) {
			const results = chatHistory.filter((message) =>
				message.message
					.toLowerCase()
					.includes(searchTerm.toLowerCase()),
			);
			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
  }, [searchTerm, chatHistory]);
	return (
		<>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					<div className='chat-search-container'>
						<input
							type='text'
							placeholder='Search messages'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<input
							type='number'
							placeholder='Jump to message index'
							onChange={(e) =>
								setJumpToIndex(Number(e.target.value))
							}
						/>
						<button onClick={handleJumpToMessage}>Jump to</button>
					</div>
					<div ref={chatHistoryRef}>
						{currentMessages.map(
							(message: ChatMessage, index: number) => (
								<div
									className={`bubble__message ${
										typeof message.name === 'string' &&
										message.name
											.toLowerCase()
											.includes('yv')
											? 'bubble__second-person y'
											: ''
									}`}
									key={`${message.timestamp.getTime()}-${index}`}>
									...
									<div
										className='unique'
										id={`unique chat-message-${chatHistory.indexOf(
											message,
										)}`}>
										<div className='space-bubble'>
											<span>
												<div className='chat__message'>
													<b>{message.name}:</b>{' '}
													{message.message}
												</div>
												{message.image &&
													typeof message.image ===
														'string' && (
														<div
															onClick={() =>
																handleImageClick(
																	index,
																)
															}>
															<img
																src={`/private-images/img/y/${message.image.slice(
																	0,
																	message.image.lastIndexOf(
																		'.',
																	),
																)}.jpg`}
																alt={message.name.toString()}
																width={300}
																height={300}
															/>
														</div>
													)}
											</span>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatHistory;
