import React from 'react';
import { ChatMessage } from '@/types';
import Bubble from './Bubble';

interface MessageProps {
	message: ChatMessage;
	index: number;
}

const Message: React.FC<MessageProps> = ({ message, index }) => {
	return (
		<div
			className={`bubble__message ${
				message.sender.toLowerCase().includes('alice')
					? 'bubble__second-person'
					: ''
			}`}
			key={message.timestamp.getTime()}>
			<div id={`chat-message-${index}`}>
				<p>
					<span>
						<div className='chat__sender'>{message.sender}</div>
						<div className='chat__message'>{message.message}</div>
					</span>
				</p>
				<Bubble message={message} index={index} />
			</div>
		</div>
	);
};

export default Message;
