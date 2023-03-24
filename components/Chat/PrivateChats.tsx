/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/Chat/ChatSearch';
import Image from 'next/image';
import { ChatMessage } from '@/types';
import { storage } from '@/utils/firebase';
import { ref, getDownloadURL } from '@firebase/storage';

const storageRef = ref(storage, 'zold.json');

interface ChatSearchProps {
	onSearch: (query: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (message: ChatMessage) => void;
	chatHistory: ChatMessage[];
}

interface ChatHistoryProps {
	pageSize: number;
	filename: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ pageSize, filename }) => {
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
	const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
	const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const messagesPerPage = 1000;
	const storageInstance = storage;
	const storageRef = ref(storageInstance, `/${filename}.json`);
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
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.scrollHeight - 500
			) {
				setVisibleMessages((prevMessages) => [
					...prevMessages,
					...chatHistory.slice(
						prevMessages.length,
						prevMessages.length + messagesPerPage,
					),
				]);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [chatHistory]);

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
	}, [fetchChatHistoryFromStorage]);

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

	const handleJumpTo = (message: ChatMessage) => {
		const index = chatHistory.findIndex(
			(chatMessage) =>
				chatMessage.timestamp.getTime() === message.timestamp.getTime(),
		);

		const messageElement = document.getElementById(`chat-message-${index}`);
		if (messageElement) {
			messageElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useEffect(() => {
		setVisibleMessages(chatHistory.slice(0, 20));
	}, [chatHistory]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.scrollHeight - 500
			) {
				setVisibleMessages((prevMessages) => [
					...prevMessages,
					...chatHistory.slice(
						prevMessages.length,
						prevMessages.length + 200,
					),
				]);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [chatHistory]);

	const indexOfLastMessage = currentPage * messagesPerPage;
	const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
	const currentMessages = chatHistory?.slice(
		indexOfFirstMessage,
		indexOfLastMessage,
	);
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
					{chatHistory &&
						visibleMessages.map(
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
									key={message.timestamp.getTime()}>
									<div
										className='unique'
										id={`unique chat-message-${index}`}>
										<div className='space-bubble'>
											<span>
												<div className='chat__message'>
													<b>{message.name}:</b>
													{message.message}
												</div>
												{message.image &&
													typeof message.image ===
														'string' && (
														<div
															onClick={() => {
																setIsViewerOpen(
																	true,
																);
																setCurrentImageIndex(
																	index,
																);
															}}>
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
					{!isLoading &&
						chatHistory &&
						visibleMessages.length === 0 && (
							<div className='no-message'>
								You have no messages in your history.
							</div>
						)}
					{isLoading && <div className='loading'>Loading...</div>}
					{!isLoading &&
						visibleMessages.length < chatHistory.length && (
							<button
								onClick={() =>
									setVisibleMessages(
										chatHistory.slice(
											0,
											visibleMessages.length +
												messagesPerPage,
										),
									)
								}>
								Load more messages
							</button>
						)}
				</div>

				{searchResults.length > 0 && (
					<div className='chat__chat-panel chat-results'>
						{searchResults.map(
							(message: ChatMessage, index: number) => (
								<div
									className={`bubble__message ${
										message.name
											.toLowerCase()
											.includes('yv')
											? 'bubble__second-person y'
											: ''
									}`}
									key={message.timestamp.getTime()}
									onClick={() => handleJumpTo(message)}>
									<Image
										src={`/apiprivate/compressed/${message.image}`}
										alt={''}
										width={300}
										height={300}
									/>
									<div className='chat__message'>
										<span className='chat__sender'>
											{message.name}
										</span>{' '}
										{message.message}
									</div>
								</div>
							),
						)}
					</div>
				)}

				{chatHistory.length > 0 && (
					<div className='chat__search'>
						<p className='chat__search-info'>
							{searchResults.length > 0
								? `Showing ${searchResults.length} search results`
								: 'No results found'}
						</p>
						<button
							className='chat__scroll-to-top'
							onClick={() => handleJumpTo(chatHistory[0])}>
							Scroll to top
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default ChatHistory;
