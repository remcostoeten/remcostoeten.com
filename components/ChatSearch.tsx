import { ChatMessage } from '@/types';
import React, { useState } from 'react';

type Props = {
	onSearch: (query: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (index: number) => void;
	chatHistory: ChatMessage[];
};

const ChatSearch: React.FC<Props> = ({
	onSearch,
	searchResults,
	onJumpTo,
	chatHistory,
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	const results = chatHistory
		.map((message: ChatMessage, index: number) => ({ message, index }))
		.filter(({ message }) =>
			message.message.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.map(({ index }) => index);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		onSearch(term);
	};

	const handleJumpTo = (index: number) => {
		onJumpTo(index);
	};
	return (
		<aside>
			<div className='search'>
				<input
					type='text'
					value={searchTerm}
					className='search__icon'
					onChange={handleSearchChange}
					placeholder='Search chat history'
				/>
				{searchTerm.length > 0 && results.length > 0 && (
					<div className='search__results'>
						{results.map((index: number) => (
							<div
								key={index}
								onClick={() => handleJumpTo(index)}>
								<span>
									{chatHistory[index]?.message?.substring(
										0,
										50,
									)}
								</span>
							</div>
						))}
					</div>
				)}
			</div>
		</aside>
	);
};

export default ChatSearch;
