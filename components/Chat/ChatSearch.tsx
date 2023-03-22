import { ChatMessage } from '@/types';
import React, { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiClose } from '@mdi/js';
import { motion } from 'framer-motion';
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
			</div>
		) : null;

	const resultsToDisplay = results.slice(0, numResultsDisplayed);

	const searchResultItems = resultsToDisplay.map((index) => (
		<div
			className='search__result-item'
			key={index}
			onClick={() => handleJumpTo(index)}>
			{chatHistory[index].message}
		</div>
	));

	const handleResultClick = (indexToRemove: number) => {
		const newResults = resultsToDisplay.filter(
			(index) => index !== indexToRemove,
		);
		setNumResultsDisplayed(newResults.length);
	};

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
									{resultsToDisplay.map((index: number) => {
										const formattedDate = moment(
											chatHistory[index].timestamp,
										).format('MM/DD/YYYY');
										return (
											<>
												<div
													className='message'
													key={index}
													onClick={() =>
														handleJumpTo(index)
													}>
													<span className='date'>
														{formattedDate}
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
