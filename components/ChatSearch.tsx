import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiClose } from '@mdi/js';
import moment from 'moment';

interface ChatSearchProps {
	searchResults: ChatMessage[];
	onSearch: (term: string) => void;
	chatHistory: ChatMessage[];
	onJumpTo: (index: number) => void;
}

const ChatSearch: React.FC<ChatSearchProps> = ({
	onSearch,
	searchResults,
	onJumpTo,
	chatHistory,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showAllResults, setShowAllResults] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const [numResultsDisplayed, setNumResultsDisplayed] = useState(5);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
	}, []);
	const results = chatHistory
		? chatHistory
				.map((message: ChatMessage, index: number) => ({
					message,
					index,
				}))
				.filter(({ message }) =>
					message.message
						.toLowerCase()
						.includes(searchTerm.toLowerCase()),
				)
				.map(({ index }) => index)
		: [];

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		onSearch(term);
	};

	const handleJumpTo = (index: number) => {
		setSearchOpen(false);

		const messageElement = document.getElementById(`chat-message-${index}`);
		if (messageElement) {
			messageElement.scrollIntoView({ behavior: 'smooth' });
		}
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

	const [showText, setShowText] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowText(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const showMoreButton = results.length > numResultsDisplayed && (
		<a
			className='btn--results'
			onClick={() => setNumResultsDisplayed(numResultsDisplayed + 5)}>
			<span>Show 5 More</span>
		</a>
	);
	const showLessResults =
		numResultsDisplayed > 5 ? (
			<a
				className='btn--results'
				onClick={() => setNumResultsDisplayed(numResultsDisplayed - 5)}>
				<span>Show less</span>
			</a>
		) : null;

	const searchResultItems =
		results.length > 0
			? results.slice(0, numResultsDisplayed).map((index) => (
					<div
						className='search__result-item'
						key={index}
						onClick={() => handleJumpTo(index)}>
						{chatHistory[index].message}
					</div>
			  ))
			: null;

	const resultsToDisplay = results.slice(0, numResultsDisplayed);

	const handleResultClick = (indexToRemove: number) => {
		const newResults = resultsToDisplay.filter(
			(index) => index !== indexToRemove,
		);
		setNumResultsDisplayed(newResults.length);
	};
	return (
		<>
			<div className='relative'>
				<div className='flex items-center bg-gray-200 rounded-md px-2 py-1'>
					<Icon
						path={mdiMagnify}
						size={1}
						className='text-gray-400'
					/>
					<input
						type='text'
						value={searchTerm}
						className='w-full ml-2 bg-transparent focus:outline-none'
						onChange={handleSearchChange}
						placeholder='Search chat history'
					/>
					<button
						className='text-gray-400 hover:text-gray-500 focus:outline-none'
						onClick={() => setShowChatInput(!showChatInput)}>
						<Icon path={mdiClose} size={1} />
					</button>
				</div>
				{showChatInput && (
					<div className='absolute left-0 right-0 top-full z-10 bg-white shadow-md rounded-md'>
						<div className='p-4'>
							{searchTerm.length > 1 && (
								<div className='text-sm text-gray-400 mb-4'>
									{results.length} results found for &apos;
									{searchTerm}&apos;
								</div>
							)}
							{searchTerm.length > 0 && results.length > 0 && (
								<div className='max-h-64 overflow-y-auto'>
									{resultsToDisplay.map((index: number) => {
										const formattedDate = moment(
											chatHistory[index].timestamp,
										).format('MM/DD/YYYY hh:mm A');
										return (
											<div
												className='flex items-center justify-between text-sm text-gray-700 mb-2'
												key={index}
												onClick={() =>
													handleJumpTo(index)
												}>
												<div className='w-1/2 truncate mr-2'>
													{chatHistory[index].message}
												</div>
												<div className='text-right text-gray-400 w-1/2 truncate'>
													{formattedDate}
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ChatSearch;
