import React, { useEffect, useState } from 'react';
import { Close, SearchOffOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
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
	const handleClose = () => {
		setShowChatInput(false);
		console.log('close');
	};
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowText(false);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<div className='sticky top-0 left-0 z-40 w-full'>
				<div className='flex items-center justify-start'>
					<span
						className='text-white cursor-pointer'
						onClick={() => setShowChatInput(!showChatInput)}
						style={{ color: '#fff' }}>
						<SearchOffOutlined />
						<span>
							{showText && (
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}
									className='ml-2'>
									Click to toggle search functionality
								</motion.span>
							)}
						</span>
					</span>
				</div>
				{showChatInput && (
					<div className='fixed bottom-0 left-0 z-40 w-2/4 h-full h-auto p-4 bg-slate-200 shadow-2xl'>
						<div className='flex flex-col'>
							<span
								className='absolute top-10 right-0 z-50 text-gray-800 cursor-pointer'
								onClick={handleClose}
								style={{ color: '#003247' }}>
								<Close />
							</span>
							<input
								type='text'
								value={searchTerm}
								className='w-full mb-3 p-2 pl-9 text-lg font-semibold border-2 border-transparent rounded focus:border-primary'
								onChange={handleSearchChange}
								placeholder='Search chat history'
							/>

							{searchTerm.length > 0 && results.length > 0 && (
								<div className='sticky top-0 left-0 z-40 p-2 bg-white border-t-4 border-primary font-semibold text-lg max-h-screen-50vh'>
									<div className='mb-2 text-gray-500'>
										{results.length} results found
									</div>
									<div className='max-h-64 overflow-y-auto'>
										{results.map((index: number) => (
											<div
												className='flex items-center w-full px-4 py-2 mb-[-0.25rem] text-gray-800 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:rounded-md'
												key={index}
												onClick={() =>
													handleJumpTo(index)
												}>
												<span className='mr-2'>
													{chatHistory[
														index
													]?.timestamp?.toLocaleDateString()}{' '}
													-{' '}
													{chatHistory[
														index
													]?.timestamp?.toLocaleTimeString()}
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
										))}
									</div>
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
