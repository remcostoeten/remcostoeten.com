import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ChatSearch from './ChatSearch';

interface OffcanvasSearchProps {
	chatHistory: Message[];
}

interface Message {
	attachments: any;
	sender: string;
	timestamp: string;
	message: string;
	chatfrom: string;
}

type ChatMessage = Message & {
	attachments?: any;
};

type ChatSearchProps = {
	chatHistory: ChatMessage[];
	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;
	searchResults: number[];
	setSearchResults: (searchResults: number[]) => void;
	handleJumpTo: (index: number) => void;
};

const SearchChat: React.FC<ChatSearchProps> = ({
	chatHistory,
	// searchResults,
	// setSearchResults,
	// handleJumpTo,
}) => {
	const [searchOpen, setSearchOpen] = useState(false);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<number[]>([]);

	useEffect(() => {
		const handleResize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 768 && searchOpen) {
			setSearchOpen(false);
		}
	}, [size.width, searchOpen]);

	const searchToggleHandler = () => {
		setSearchOpen((prevState) => !prevState);
		document.body.classList.add('searchOpen');
	};

	useEffect(() => {
		if (!searchOpen) {
			document.body.classList.remove('searchOpen');
		}
	}, [searchOpen]);

	const handleJumpTo = (index: number) => {
		setSearchResults([index]);
	};

	return (
		<div className='offcanvas-search'>
			<div className='search__toggle'>
				{!searchOpen ? (
					<div className='offcanvas' onClick={searchToggleHandler}>
						<h2>test</h2>
					</div>
				) : (
					<div className='offcanvas-search'>
						<div onClick={searchToggleHandler}>
							<div className='close'></div>
						</div>
						<ChatSearch
							chatHistory={chatHistory}
							searchTerm={searchTerm}
							setSearchTerm={
								setSearchTerm as Dispatch<
									SetStateAction<string>
								>
							}
							searchResults={searchResults}
							setSearchResults={
								setSearchResults as Dispatch<
									SetStateAction<number[]>
								>
							}
							handleJumpTo={function (index: number): void {
								throw new Error('Function not implemented.');
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchChat;
