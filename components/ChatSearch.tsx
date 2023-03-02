import { ChatMessage } from '@/types';
import React, { useEffect, useState } from 'react';

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
	const [searchOpen, setSearchOpen] = useState(false);
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
	const handleClose = () => {
		setSearchOpen(false);
	};

	const [showChatInput, setShowChatInput] = useState(false);

	useEffect(() => {
		if (showChatInput) {
			setTimeout(() => {
				document.body.classList.add('searchOpen');
			}, 1);
		} else {
			document.body.classList.remove('searchOpen');
		}
	}, [showChatInput]);

	useEffect(() => {
		document.body.classList.add('disable-transition');
		setTimeout(() => {
			document.body.classList.remove('disable-transition');
		}, 100);
	}, []);

	return (
		<>
			<svg width='16' height='16' fill='white' viewBox='0 0 16 16'>
				<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
			</svg>
			<button onClick={() => setShowChatInput(!showChatInput)}>
				{showChatInput ? 'Hide Chat' : 'Show Chat'}
			</button>

			{showChatInput && (
				<div className='offcanvas search'>
					<svg
						onClick={handleClose}
						width='16'
						height='16'
						fill='#2f2f3e'
						viewBox='0 0 16 16'
						className='close'>
						<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
					</svg>
					<button onClick={() => setShowChatInput(!showChatInput)}>
						{showChatInput ? 'Hide Chat' : 'Show Chat'}
					</button>

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
											{chatHistory[
												index
											]?.message?.substring(0, 50)}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ChatSearch;
