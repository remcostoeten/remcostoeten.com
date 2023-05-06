import React, { useEffect, useState } from 'react';
import { Close, Search, SearchOff, SearchOffSharp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Icon
} from '@mui/material';
import { ChatMessage } from '@/utils/types';

interface ChatSearchProps {
	onSearch: (searchTerm: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (index: number) => void;
	chatHistory: ChatMessage[];
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
	const maxResultsToShow = 10;

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

	const slicedResults = results.slice(
		0,
		showAllResults ? results.length : maxResultsToShow,
	);

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

	const [showText, setShowText] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowText(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);
	return (
		<>
			<div className='sticky top-0 left-0 z-40'>
				<div className='flex items-center justify-start'>
					<span
						className='text-white cursor-pointer'
						onClick={() => setShowChatInput(!showChatInput)}
						style={{ color: '#fffd' }}>
<SearchOffSharp/>					<span>
							{showText && (
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}
									className='ml-2'>
									Click to toggle search functionality
								</motion.span>
							)}
						</span>{' '}
					</span>
				</div>
				{showChatInput && (
					<div className='fixed top-0 left-0 z-40 w-full h-auto p-4 bg-white'>
						<span
							className='absolute top-0 right-0 z-40 text-gray-800'
							onClick={() => setShowChatInput(!showChatInput)}
							style={{ color: '#003247' }}>
<Close/>						</span>

						<div className='flex flex-col'>
							<input
								type='text'
								value={searchTerm}
								className='w-full mb-3 p-2 pl-9 text-lg font-semibold border-2 border-transparent rounded focus:border-primary'
								onChange={handleSearchChange}
								placeholder='Search chat history'
							/>

							{searchTerm.length > 0 && results.length > 0 && (
								<div className='sticky top-0 left-0 p-2 bg-white border-t-4 border-primary font-semibold text-lg'>
									{results.map((index: number) => (
										<div
											className='flex flex-row-reverse items-center w-full px-4 py-2 mb-[-0.25rem] text-gray-800 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:rounded-md'
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
			</div>
		</>
	);
};

export default ChatSearch;
