import { useEffect, useState } from 'react';

const ChatSearch: React.FC<ChatSearchProps> = ({
	chatHistory,
	searchTerm,
	setSearchTerm,
	searchResults,
	setSearchResults,
	handleJumpTo,
}) => {
	const [isOpen, setIsOpen] = useState(false);

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
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearchChange}
				placeholder='Search chat history'
				className={`chat-search ${isOpen ? 'open' : ''}`}
			/>
			{searchTerm.length > 0 && (
				<div className={`chat-search-results ${isOpen ? 'open' : ''}`}>
					{searchResults.map((index) => (
						<button
							key={index}
							onClick={() => {
								handleJumpTo(index);
								setIsOpen(false);
							}}>
							Jump to result {index + 1}
						</button>
					))}
				</div>
			)}
		</>
	);
};

export default ChatSearch;
