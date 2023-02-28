import React, { useState, useEffect } from 'react';
import chatData from '../../api/chatDisplayData.json';
import ChatHistory from '../../components/ChatHistory';
import ChatSearch from '../../components/ChatSearch';

interface Message {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
}

const ChatContainer: React.FC = () => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<number[]>([]);

	useEffect(() => {
		setChatHistory(chatData);
	}, []);

	useEffect(() => {
		if (searchTerm) {
			const results = chatHistory
				.map((message, index) => {
					if (
						message.message
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					) {
						return index;
					}
					return null;
				})
				.filter((result) => result !== null) as number[];

			setSearchResults(results);
		} else {
			setSearchResults([]);
		}
	}, [chatHistory, searchTerm]);

	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	if (chatHistory.length === 0) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<ChatSearch
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchResults={searchResults}
				handleJumpTo={(index: number) => {
					const element = document.getElementById(
						`chat-message-${index}`,
					);
					if (element) {
						element.scrollIntoView({ behavior: 'smooth' });
					}
				}}
			/>
			<ChatHistory chatHistory={chatHistory} searchTerm={searchTerm} />
		</>
	);
};

export default ChatContainer;
