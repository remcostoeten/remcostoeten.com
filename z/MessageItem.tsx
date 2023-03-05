import React from 'react';
import { Message } from '../models/Message';

interface MessageItemProps {
	message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
	console.log(message); // Add this line to check if the message is being passed correctly

	return (
		<div className='message-item'>
			<div className='message-sender'>{message.sender}</div>
			<div className='message-text'>{message.text}</div>
			<div className='message-time'>{message.time}</div>
		</div>
	);
};
