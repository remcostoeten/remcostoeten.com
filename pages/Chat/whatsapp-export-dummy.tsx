import React from 'react';

interface Message {
	sender: string;
	timestamp: string;
	message: string;
}

interface ChatHistoryProps {
	chatData: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatData }) => {
	return (
		<div className='chat-history'>
			{chatData.map((message: Message, index: number) => (
				<div
					className={`message ${
						message.message.includes('Bob') ? 'urgent-message' : ''
					}`}
					key={index}>
					<div className='sender'>{message.sender}</div>
					<div className='timestamp'>{message.timestamp}</div>
					<div className='message-body'>{message.message}</div>
				</div>
			))}
		</div>
	);
};

export default ChatHistory;
