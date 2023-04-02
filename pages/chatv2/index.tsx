import React, { useState, useEffect } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { getChatHistory, Message } from '@/utils/firebase';
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

const Chat: React.FC = () => {
	const [chatHistory, setChatHistory] = useState<Message[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [searchResults, setSearchResults] = useState<Message[]>([]);
	const [listHeight, setListHeight] = useState<number>(400); // Initialize the height with a default value

	const toggleDrawer = (open: boolean) => {
		setDrawerOpen(open);
	};

	const itemCount = Math.min(currentPage * pageSize, chatHistory.length);

	useEffect(() => {
		document.body.classList.add('chat-v2');
	}, []);

	100;

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
	};

	return (
		<>
			<div className='container chat'>
				<div>
					{/* Search button */}
					<Button
						onClick={() => toggleDrawer(true)}
						variant='outlined'>
						Search
					</Button>

					<Drawer
						anchor='right'
						open={drawerOpen}
						onClose={() => toggleDrawer(false)}>
						<div style={{ width: 300, padding: 16 }}>
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
					height={100} // Use the listHeight state value
					itemCount={itemCount}
					itemSize={100} // Adjust the item size according to your requirements
					width='100%'
					itemData={displayedMessages}>
					{Row}
				</List>
				<div className='pagination'>
					<Pagination
						count={Math.ceil(chatHistory.length / pageSize)}
						onChange={(e, newPage) => handlePageChange(newPage)}
						page={currentPage}
						color='primary'
					/>
				</div>
			</div>
		</>
	);
};

export default Chat;
