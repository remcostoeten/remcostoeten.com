import { ChatMessage } from '@/types';
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import {
	mdiMagnify,
	mdiCloseCircleOutline,
	mdiClose,
	mdiSearchWeb,
	mdiCarSearch,
	mdiSeatReclineExtra,
	mdiMapSearch,
	mdiTextSearch,
} from '@mdi/js';
import { motion } from 'framer-motion';

interface ChatSearchProps {
	onSearch: (term: string) => void;
	searchResults: string;
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
	const [numResultsDisplayed, setNumResultsDisplayed] = useState(5); // state variable to keep track of number of results displayed
	const [isMobile, setIsMobile] = useState(false); // state variable to keep track if the user is on a mobile device

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
		// Check if the clicked message index is still included in the search results
		if (results.includes(index)) {
			// Get all message elements
			const messageElements = document.getElementsByClassName('message');

			// Find the clicked message element using the index
			const messageElement = Array.from(messageElements).find(
				(element) =>
					element.getAttribute('data-index') === index.toString(),
			);

			// If the element is found, add a CSS class to it
			if (messageElement) {
				messageElement.classList.add('selected');
			}
		}

		// Call the onJumpTo function with the clicked message index
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

	const [showText, setShowText] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowText(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const showMoreButton = results.length > numResultsDisplayed && (
		<>
			<a
				className='btn--results'
				onClick={() => setNumResultsDisplayed(numResultsDisplayed + 5)}>
				<span>Show 5 More</span>
			</a>
		</>
	);
	const showLessResults =
		numResultsDisplayed > 5 ? (
			<a
				className='btn--results'
				onClick={() => setNumResultsDisplayed(numResultsDisplayed - 5)}>
				<span>Show less</span>
			</a>
		) : null;

	const searchResultsDisplay =
		searchTerm.length === 1 ? (
			<div className='search__total-results'>
				A total of {results.length} results found for {searchTerm}
				{showMoreButton}
			</div>
		) : null;

	const resultsToDisplay = results.slice(0, numResultsDisplayed); // slice the results array to display only the specified number of results

	const handleResultClick = (indexToRemove: number) => {
		const newResults = resultsToDisplay.filter(
			(index) => index !== indexToRemove,
		);
		setNumResultsDisplayed(newResults.length);
	};
	const searchResultItems = resultsToDisplay.map((index) => (
		<div
			className='search__result-item'
			key={index}
			onClick={() => handleResultClick(index)}>
			{chatHistory[index].message}
		</div>
	));
	return (
		<>
			<div className='chat-header sticky'>
				<div className='toggle-wrapper'>
					<span
						className='toggle'
						onClick={() => setShowChatInput(!showChatInput)}
						style={{ color: '#fffd' }}>
						<Icon path={mdiMagnify} size={3} />
						<span>
							{showText && (
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}
									style={{ marginLeft: '0.5rem' }}>
									Click to toggle search functionality
								</motion.span>
							)}
						</span>{' '}
					</span>
				</div>
				{showChatInput && (
					<div className='offcanvas search'>
						<span
							className='close-offcanvas'
							onClick={() => setShowChatInput(!showChatInput)}
							style={{ color: '#003247' }}>
							<Icon path={mdiClose} size={3} />
						</span>

						<div className='search'>
							<input
								type='text'
								value={searchTerm}
								className='search__icon'
								onChange={handleSearchChange}
								placeholder='Search chat history'
							/>
							{searchTerm.length === 1 && (
								<div>
									{results.length === 1 && (
										<p className='search__total-results'>
											A total o 1 results found for &apos;
											{showLessResults}
											{showMoreButton}
										</p>
									)}
									{results.length > 6 && (
										<p className='search__total-results'>
											A total of {results.length} results
											found for &apos;{searchTerm}&apos;
											<div className='show'>
												{showLessResults}
												{showMoreButton}{' '}
											</div>{' '}
										</p>
									)}
								</div>
							)}

							{searchTerm.length > 1 && (
								<div>
									{results.length > 0 && (
										<p className='search__total-results'>
											A total of {results.length} results
											found for &apos;{searchTerm}&apos;
											<div className='show'>
												{showLessResults}
												{showMoreButton}{' '}
											</div>{' '}
										</p>
									)}
								</div>
							)}
							{searchTerm.length > 0 && results.length > 0 && (
								<div className='search__results'>
									{resultsToDisplay.map((index: number) => (
										<>
											<div
												className='message'
												key={index}
												onClick={() =>
													handleJumpTo(index)
												}>
												<span className='date'>
													{new Date(
														chatHistory[
															index
														].timestamp,
													).toLocaleDateString()}
												</span>
												<span>
													{chatHistory[
														index
													]?.message?.substring(
														0,
														50,
													)}
												</span>
											</div>
										</>
									))}
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
