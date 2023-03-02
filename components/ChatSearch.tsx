import { ChatMessage } from '@/types';
import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
	const [showAllResults, setShowAllResults] = useState(false);
	const maxResultsToShow = 10;
	const results = chatHistory
		.map((message: ChatMessage, index: number) => ({ message, index }))
		.filter(({ message }) =>
			message.message.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.map(({ index }) => index)
		.slice(0, showAllResults ? results.length : maxResultsToShow);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		onSearch(term);
	};

	const handleJumpTo = (index: number) => {
		onJumpTo(index);
	};

	const tooltip = (
		<Tooltip id='tooltip'>Click to jump to the search result</Tooltip>
	);

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
							<OverlayTrigger
								placement='left'
								overlay={tooltip}
								key={index}>
								<div
									className='search__result'
									onClick={() => handleJumpTo(index)}>
									<span className='search__text'>
										{chatHistory[index]?.message?.substring(
											0,
											25,
										)}
									</span>
									<FaExternalLinkAlt />
								</div>
							</OverlayTrigger>
						))}
					</div>
				)}
			</div>
		</aside>
	);
};

export default ChatSearch;
