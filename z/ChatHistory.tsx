import React, { useState, useMemo } from 'react';
import { Message } from '../../Message';
import { MessageItem } from './MessageItem';

interface ChatHistoryProps {
	messages: Message[];
	pageSize: number;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
	messages,
	pageSize,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	const pageCount = useMemo(() => {
		return Math.ceil(messages.length / pageSize);
	}, [messages, pageSize]);

	const paginatedMessages = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		return messages.slice(startIndex, endIndex);
	}, [currentPage, messages, pageSize]);

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div className='chat-history'>
			{paginatedMessages.map((message) => (
				<MessageItem key={message.id} message={message} />
			))}
			<div className='pagination'>
				{Array.from({ length: pageCount }, (_, index) => index + 1).map(
					(pageNumber) => (
						<button
							key={pageNumber}
							className={
								pageNumber === currentPage ? 'active' : ''
							}
							onClick={() => handlePageChange(pageNumber)}>
							{pageNumber}
						</button>
					),
				)}
			</div>
		</div>
	);
};
