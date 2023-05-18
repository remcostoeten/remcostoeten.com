import { ReactNode } from 'react';

export interface ChatSearchProps {
	onSearch: (query: string) => void;
	searchResults: string;
	onJumpTo: (message: ChatMessage) => void;
	chatHistory: ChatMessage[];
}

export interface ChatMessage {
	name: string;
	image: ReactNode;
	id: string;
	message: string;
	type: 'sent' | 'received';
	attachments?: any;
	sender: string;
	isSelf: boolean;
	timestamp: Date;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	category: string;
	status: 'todo' | 'inprogress' | 'done';
	date: string;
}
