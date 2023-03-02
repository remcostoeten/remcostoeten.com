import React, { useEffect, useState } from 'react';
import ChatSearch from '../../components/ChatSearch';
import { ChatMessage, Attachment } from '../../types';

const getChatHistory = (): ChatMessage[] => {
	const chatHistoryRaw: any[] = require('../whatsapp-export/ChatHistory.json');
	return chatHistoryRaw.map((msg: any): ChatMessage => {
		const { attachments, sender, timestamp, message } = msg;

		return {
			id: 'dummy-id',
			message: message,
			type: message.type === 'sent' ? 'sent' : 'received',
			attachments:
				attachments && Array.isArray(attachments)
					? attachments.map((att) => {
							const { photo, format, device } = att;
							return {
								id: 'dummy-id',
								type: att.type,
								data: att.data,
								photo: photo || '',
								format: format || '',
								device: device || '',
							};
					  })
					: [],
			sender,
			timestamp: new Date(timestamp),
		};
	});
};

const ChatHistory: React.FC = () => {
	const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [showSearch, setShowSearch] = useState(false);

	useEffect(() => {
		document.body.classList.add('chat-ui');
		return () => {
			document.body.classList.remove('chat-ui');
		};
	}, []);

	useEffect(() => {
		const chatHistoryRaw: ChatMessage[] = getChatHistory();
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
		const index = message
			? chatHistory.findIndex((m) => m.timestamp === message.timestamp)
			: -1;
		const messageElement = document.getElementById(`chat-message-${index}`);
		if (messageElement) {
			messageElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<article>
				<p>
					Feature for me to practice hooks and other react/nextJS
					features. On whatsapp there's the possibility to export your
					chats which generates a plain .txt. I converted the txt to
					json objects (some chats had almost up to a million lines).
					Once converted to JSON I fetched the data, mapped over it
					and displayed it here. Besides that i've added a search
					throug hthe map functionlaity. Initially it was a filter
					functionaliy, but I much prefer a jump to toggle like this.
					Also had to come up with a solution for mobile since there's
					little space and flex-direction row wouldn't work so i've
					made it that the search is toggleable in a offcanvas menu.
					Code can be found
					<a
						href='https://github.com/remcostoeten/'
						target='_blank'
						rel='noreferrer'>
						here
					</a>
					. The whataspp export is private for obvious reasons but to
					showcase the feature i've made a dummy
				</p>
			</article>
			<ChatSearch
				onSearch={handleSearch}
				searchResults={searchResults}
				onJumpTo={(index: number) => handleJumpTo(searchResults[index])}
				chatHistory={chatHistory}
			/>
			<div className='chat'>
				<div className='chat__chat-panel chat-history'>
					{chatHistory &&
						chatHistory.map(
							(message: ChatMessage, index: number) => (
								<div
									className={`bubble__message ${
										message.sender
											.toLowerCase()
											.includes('alice')
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
			</div>
		</>
	);
};

export default ChatHistory;
