import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { Message } from '@/utils/firebase';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';

const pageSize = 50;
const previewLength = 10;

interface RowProps extends ListChildComponentProps {
	data: Message[];
}

interface ChatProps {
	getChatHistory: () => Promise<Message[] | null>;
}

const Row: React.FC<RowProps> = ({ index, style, data }) => {
	if (!data || index < 0 || index >= data.length) {
		return null;
	}

	const msg = data[index];
	const msgClass =
		msg.name === 'Yvette' ? 'yvette' : msg.name === 'Remco' ? 'remco' : '';

	return (
		<div className={`message ${msgClass}`} style={style}>
			<div className='name'>{msg.name}</div>
			<div className='text'>{msg.message}</div>
		</div>
	);
};

const Chatv2: React.FC<ChatProps> = ({ getChatHistory }) => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searchResults, setSearchResults] = useState<Message[]>([]);
	const [listHeight, setListHeight] = useState<number>(600); // Initialize the height with a default value
	const listRef = useRef<List>(null); // Add a reference to the List component

	const toggleDrawer = (open: boolean) => {
		setDrawerOpen(open);
	};

	const itemCount = Math.min(currentPage * pageSize, chatHistory.length);

	useEffect(() => {
		document.body.classList.add('chat-v2');
	}, []);

	useEffect(() => {
		const updateHeight = () => {
			setListHeight(window.innerHeight + 100); // Adjust the subtraction value according to your layout
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);
		return () => window.removeEventListener('resize', updateHeight);
	}, []);

	useEffect(() => {
		const fetchChatHistory = async () => {
			const data = await getChatHistory();
			if (data) {
				setChatHistory(data);
			}
		};
		fetchChatHistory();
	}, []);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const displayedMessages = chatHistory.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	const handleSearch = () => {
		const results = chatHistory.reduce<Message[]>((acc, msg, index) => {
			const pos = msg.message
				.toLowerCase()
				.indexOf(searchQuery.toLowerCase());
			if (pos !== -1) {
				const previewStart = Math.max(pos - previewLength, 0);
				const previewEnd = Math.min(
					pos + searchQuery.length + previewLength,
					msg.message.length,
				);
				const preview = msg.message.slice(previewStart, previewEnd);
				acc.push({ ...msg, preview, index });
			}
			return acc;
		}, []);
		setSearchResults(results);
	};

	  const jumpToMessage = (index: number) => {
			setCurrentPage(Math.ceil((index + 1) / pageSize));
			listRef.current?.scrollToItem(index - pageSize / 2, 'start'); // Scroll to the message position, showing equal amount of messages above and below
		};

	return (
		<>
			<div className='flex flex-col h-screen w-screen'>
				<div className='p-4'>
					{/* Search button */}
					<Button
						onClick={() => toggleDrawer(true)}
						variant='outlined'>
						Search
					</Button>
					f
					<Drawer
						anchor='right'
						open={drawerOpen}
						onClose={() => toggleDrawer(false)}>
						<div className='w-72 p-4'>
							<TextField
								fullWidth
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder='Search'
								InputProps={{
									endAdornment: (
										<IconButton onClick={handleSearch}>
											<SearchIcon />
										</IconButton>
									),
								}}
							/>
							<div>
								{searchResults.map((result) => (
									<ListItem
										button
										key={result.index}
										onClick={() => {
											jumpToMessage(result.index);
											toggleDrawer(false);
										}}>
										<ListItemText
											primary={result.preview}
											secondary={`By ${result.name}`}
										/>
									</ListItem>
								))}
							</div>
						</div>
					</Drawer>
				</div>
				<List
					ref={listRef} // Add the reference to the List component
					height={listHeight}
					itemCount={itemCount}
					width='100%'
					itemSize={50}
					itemData={displayedMessages}
					className='flex-grow bg-gray-200 p-4 overflow-y-auto'>
					{Row}
				</List>
				<div className='sticky bottom-0 p-4 bg-gray-100 border-t border-gray-200'>
					<Pagination
						count={Math.ceil(chatHistory.length / pageSize)}
						onChange={(e, newPage) => handlePageChange(newPage)}
						page={currentPage}
						color='primary'
						className='flex justify-center'
					/>
				</div>
			</div>
		</>
	);
};

export default Chatv2;
