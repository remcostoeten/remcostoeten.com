import { ChatMessage } from '@/types';
import React, { useEffect, useState } from 'react';
import ChatBubbleAlert from './AlertBubble';
import Icon from '@mdi/react';
import { mdiNoteSearch, mdiCloseCircleOutline } from '@mdi/js';
type Props = {
	onSearch: (query: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (index: number) => void;
	chatHistory: ChatMessage[];
};

interface ChatBubbleAlert {
	message: any;
}
interface ChatSearchProps {
	onSearch: (term: string) => void;
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
		.map((message: ChatMessage, index: number) => ({ message, index }))
		.filter(({ message }) =>
			message.message.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.map(({ index }) => index);
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

	useEffect(() => {
		const body = document.querySelector('body');
		if (body) {
			const scrollPosition = window.scrollY;
			if (scrollPosition >= 100) {
				body.classList.add('scrolled');
			} else {
				body.classList.remove('scrolled');
			}
		}
	}, []);

	return (
		<>
			<div className='chat-header sticky'>
				<span
					className='toggle'
					onClick={() => setShowChatInput(!showChatInput)}
					style={{ color: '#fffd' }}>
					<Icon path={mdiNoteSearch} size={3} />
				</span>

				{showChatInput && (
					<div className='offcanvas search'>
						<span
							className='close-offcanvas'
							onClick={() => setShowChatInput(!showChatInput)}
							style={{ color: '#003247' }}>
							<Icon
								path={mdiCloseCircleOutline}
								spin={-5}
								size={3}
							/>
						</span>

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
									<div>
										<ChatBubbleAlert />
									</div>{' '}
									{results.map((index: number) => (
										<div
											className='message'
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
