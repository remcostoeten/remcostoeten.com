import React, { useEffect, useState } from 'react';
import ChatSearch from '@/components/ChatSearch';
import Image from 'next/image';
import Warning from '@/components/ui-elements/Warning';
import moment from 'moment';
import Head from 'next/head';
import Waves from '@/components/svg-elements/Waves';

import { ChatMessage, ChatSearchProps } from '@/utils/types';

const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);

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
		const chatHistoryRaw: any[] = require('./ChatHistory.json');
		const messageHistory: ChatMessage[] = chatHistoryRaw.map(
			(chatMessage) => ({
				...chatMessage,
				timestamp: new Date(chatMessage.timestamp),
				avatarUrl: chatMessage.avatarUrl,
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

	useEffect(() => {
		setVisibleMessages(chatHistory.slice(0, 20));
	}, [chatHistory]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.scrollHeight - 500
			) {
				setVisibleMessages((prevMessages: ChatMessage[]) => [
					...prevMessages,
					...chatHistory.slice(
						prevMessages.length,
						prevMessages.length + 20,
					),
				]);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [chatHistory]);

	return (
		<>
			<Head>
				<title>Chat export demo</title>
				<meta
					name='Remco stoeten - remcostoeten.com '
					content='Demo of a chat export which i exported from whatsapp .txt and converte to json.'
				/>
				<link
					rel='canonical'
					href='https://remcostoeten.com/chat-export'
				/>
			</Head>
			<Waves />
			<Warning />
			<div className='h-full flex flex-col m-auto w-2/4'>
				<div className='p-4'>
					<ChatSearch
						onSearch={handleSearch}
						onJumpTo={(index: number) =>
							handleJumpTo(searchResults[index])
						}
						chatHistory={chatHistory}
						searchResults={searchResults}
					/>
				</div>
				<div className='flex-grow overflow-y-auto p-4'>
					{visibleMessages.map(
						(message: ChatMessage, index: number) => (
							<div
								id={`chat-message-${index}`}
								className={`flex flex-col mb-4 ${
									message.sender === 'Bob'
										? 'items-end'
										: 'items-start'
								}`}
								key={message.timestamp.getTime()}>
								<div
									className={`rounded-lg px-4 py-2 ${
										message.sender === 'Bob'
											? 'bg-green-500 text-white'
											: 'bg-gray-200'
									} rounded-bl-none ${
										message.sender === 'me'
											? 'rounded-tr-lg'
											: 'rounded-tl-lg'
									}`}>
									{message.image && (
										<img
											src={`/apiprivate/compressed/${message.image}`}
											alt=''
											className='max-w-full h-auto rounded-lg mb-2'
										/>
									)}
									<div className='text-sm'>
										<span
											className='text-white mr-2'
											className={` ${
												message.sender === 'Bob'
													? 'bg-green-500 text-white'
													: 'bg-gray-200'
											} rounded-bl-none ${
												message.sender === 'me'
													? 'rounded-tr-lg'
													: 'rounded-tl-lg'
											}`}>
											{message.sender}:
										</span>
										{message.message}
									</div>
								</div>
								<div className='text-xs text-gray-400 mt-1'>
									{moment(message.timestamp).format('h:mm A')}
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
