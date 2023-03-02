import React, { useState } from 'react';
import { ChatMessage } from '../../types';

interface Props {
	onSearch: (term: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (index: number) => void;
	chatHistory: ChatMessage[];
	numResultsToShow: number;
}

const ChatSearch: React.FC<Props> = ({
	onSearch,
	searchResults,
	onJumpTo,
	chatHistory,
	numResultsToShow,
}) => {
	const [numResultsShown, setNumResultsShown] = useState(numResultsToShow);

	const handleShowMore = () => {
		setShowCount((prevCount) => prevCount + 5);
	};

	return (
		<div className='chat-search'>
			<input
				type='text'
				className='chat-search__input'
				placeholder='Search'
				onChange={(e) => onSearch(e.target.value)}
			/>
			{searchResults.length > 0 && (
				<div className='chat-search__results'>
					<ul>
						{searchResults
							.slice(0, numResultsShown)
							.map((result, index) => (
								<li
									key={result.id}
									onClick={() =>
										onJumpTo(chatHistory.indexOf(result))
									}>
									<span className='chat-search__sender'>
										{result.sender}
									</span>
									<span className='chat-search__message'>
										Showing{' '}
										{Math.min(
											numResultsShown,
											searchResults.length,
										)}{' '}
										of {searchResults.length} results
										{result.message}
									</span>
								</li>
							))}
					</ul>
					{searchResults.length > numResultsShown && (
						<button onClick={handleShowMore}>Show More</button>
					)}
				</div>
			)}
		</div>
	);
};

export default ChatSearch;
function setShowCount(arg0: (prevCount: any) => any) {
	throw new Error('Function not implemented.');
}
