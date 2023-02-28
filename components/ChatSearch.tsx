import React, { useState, useEffect } from 'react';
import chatData from '../api/chatDisplayData.json';
import ChatSearch from './ChatSearch';

interface Message {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
}

interface ChatHistoryProps {
	chatData: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatData }) => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);
	useEffect(() => {
		setChatHistory(chatData);
	}, [chatData]);
	const [searchOpen, setMenuOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<number[]>([]);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		setChatHistory(chatData);
	}, [chatData]);

	useEffect(() => {
		if (chatHistory.length > 0) {
			const results = chatHistory
				.filter((message: Message) =>
					message.message
						.toLowerCase()
						.includes(searchTerm.toLowerCase()),
				)
				.map((message: Message, index: number) => index);
			setSearchResults(results);
		}
	}, [chatHistory, searchTerm]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value;
		setSearchTerm(term);
	};

	const handleJumpTo = (index: number) => {
		const element = document.getElementById(`chat-message-${index}`);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<ChatSearch
				searchTerm={searchTerm}
				handleSearchChange={handleSearchChange}
				searchResults={searchResults}
				handleJumpTo={handleJumpTo}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{chatHistory.map((message: Message, index: number) => (
						<div
							className={`bubble__message ${
								message.sender.toLowerCase().includes('alice')
									? 'bubble__second-person'
									: ''
							}`}
							key={message}>
							<div id={`chat-message-${index}`}>
								<p>
									<div>{message.sender}</div>
									<div>{message.message}</div>
									<div>
										{message.attachments?.photo !==
										undefined
											? `Photo: ${message.attachments?.photo}`
											: undefined}
									</div>
									<div className='bubble__attachments'>
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
