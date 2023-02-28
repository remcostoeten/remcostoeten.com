import React, { useState, useEffect } from 'react';
import chatData from '/../api/chatDisplayData.json';
import ChatHistory from '../pages/whatsapp-export/ChatHistory';
import ChatSearch from './ChatSearch';

interface Message {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
}

const ChatContainer: React.FC = () => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {};
		document.body.classList.remove('chat-ui');
	}, []);
	useEffect(() => {
		setChatHistory(chatData);
	}, []);

	return (
		<>
			<ChatSearch
				chatHistory={chatHistory}
				setChatHistory={setChatHistory}
			/>
			<ChatHistory chatHistory={chatHistory} />
		</>
	);
};

export default ChatContainer;
