import { Key, useEffect, useState } from 'react';
import OffcanvasSearch from './OffcanvasSearch';

type ChatSearchProps = {
	chatHistory: Message[];
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	searchResults: number[];
	setSearchResults: (searchResults: number[]) => void;
	handleJumpTo: (index: number) => void;
};

type Message = {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
};

const ChatSearch: React.FC<ChatSearchProps> = ({
	chatHistory,
	searchResults,
	setSearchResults,
	handleJumpTo,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === '/') {
				setIsOpen(true);
			}
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('searchOpen');
		} else {
			document.body.classList.remove('searchOpen');
		}
	}, [isOpen]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		if (chatHistory) {
			const matches: number[] = [];
			chatHistory.forEach((message, index) => {
				if (
					message.message
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				) {
					matches.push(index);
				}
			});
			setSearchResults(matches);
		}
	}, [chatHistory, searchTerm, setSearchResults]);

	return (
		<>
			<OffcanvasSearch chatHistory={[]} />
			<div className='search-results'>
				<input
					type='text'
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder='Search chat history'
					className={`chat-search ${isOpen ? 'open' : ''}`}
				/>
				{searchTerm && searchTerm.length > 0 && (
					<div
						className={`chat-search-results ${
							isOpen ? 'open' : ''
						}`}>
						{searchResults?.map((index: number) => {
							const message = chatHistory[index];
							return (
								<button
									key={message.timestamp}
									onClick={() => {
										handleJumpTo(index);
										setIsOpen(false);
									}}>
									Jump to result...
								</button>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default ChatSearch;
