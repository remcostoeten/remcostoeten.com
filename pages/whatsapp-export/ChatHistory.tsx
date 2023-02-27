import React, { useState, useEffect } from 'react';
import chatData from './remcostoeten-private-apiroutes/proper/whatsapp-export';
import ChatSearch from '@/components/ChatSearch';
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
		return () => {};
		document.body.classList.remove('chat-ui');
	}, []);
	useEffect(() => {
		setChatHistory(chatData);
	}, [chatData]);

	return (
		<>
			<ChatSearch />
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
