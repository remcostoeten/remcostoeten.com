import FeatureStory from '@/components/Chat/Article';
import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/Chat/ChatSearch';
import { ChatMessage, Attachment } from '../../types';
import withAuth from '../withAuth';

interface ChatSearchProps {
	onSearch: (query: string) => void;
	searchResults: string;
	onJumpTo: (message: ChatMessage) => void;
	chatHistory: ChatMessage[];
}

const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [showFullText, setShowFullText] = useState(false);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [showFullContent, setShowFullContent] = useState(false);

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
		const chatHistoryRaw: any[] = require('../../private-apis/data/znew.json');
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

	const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);

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
						prevMessages.length + 20,
					),
				]);
			}

			if (window.scrollY > 200) {
				return;
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [chatHistory]);

	return (
		<>
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
										message.message
											.toLowerCase()
											.includes(
												process.env
													.NEXT_PUBLIC_CHAT_ONE,
											)
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
				{searchResults.length > 0 && (
					<div className='chat__chat-panel chat-results'>
						{searchResults.map(
							(message: ChatMessage, index: number) => (
								<div
									className={`bubble__message ${
										message.message
											.toLowerCase()
											.includes('alice')
											? 'bubble__second-person'
											: ''
									}`}
									key={message.timestamp.getTime()}
									onClick={() => handleJumpTo(message)}>
									<div>
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
				)}
			</div>
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
		</>
	);
};

export default withAuth(ChatHistory);
