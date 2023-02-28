import React from 'react';
import chatData from '../../api/chatDisplayData.json';
interface Message {
	attachments?: {
		photo?: string;
		format?: string;
		device?: string;
	};
	sender?: string;
	timestamp?: string;
	message?: string;
	chatfrom?: string;
}

interface ChatHistoryProps {
	chatHistory: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
	return (
		<div className='chat'>
			<div className='chat__chat-panel chat-history'>
				{chatHistory.map((message: Message, index: number) => (
					<div
						className={`bubble__message ${
							message.sender?.toLowerCase().includes('alice')
								? 'bubble__second-person'
								: ''
						}`}
						key={index}>
						<div id={`chat-message-${index}`}>
							{message.sender && <p>{message.sender}</p>}
							{message.message && <p>{message.message}</p>}
							{message.attachments?.photo && (
								<p>Photo: {message.attachments.photo}</p>
							)}
							<div className='bubble__attachments'>
								{message.attachments?.format && (
									<span>
										Format: {message.attachments.format}
									</span>
								)}
								{message.attachments?.device && (
									<span>
										Device: {message.attachments.device}
									</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatHistory;

export async function getStaticProps() {
	const chatHistory = chatData.chat.slice(1); // ignore first item which is chatfrom
	return { props: { chatHistory } };
}
