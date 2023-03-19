import { ReactNode } from 'react';

export interface Task {
	id: string;
	title: string;
	category: 'todo' | 'inprogress' | 'done';
}

export interface Message extends ChatMessage {
	message: string;
	attachments: any;
	sender: string;
	timestamp: Date;
}

export interface Attachment {
	id: string;
	type: string;
	data: string;
	photo?: string;
	format?: string;
	device?: string;
}
export interface ChatSearchProps {
	onSearch: (searchTerm: string) => void;
	searchResults: ChatMessage[]; // fix the type to ChatMessage[]
	chatHistory: ChatMessage[];
	onJumpTo: (message: ChatMessage) => void;
}

export interface ChatMessage {
	name: ReactNode;
	image: ReactNode;
	id: string;
	message: string;
	type: 'sent' | 'received';
	attachments?: Attachment[];
	sender: string;
	timestamp: Date;
}
export interface Chat {
	id: string;
	message: string;
	type: 'sent' | 'received';
	attachments?: Attachment[];
	sender: string;
	timestamp: Date;
}

export type Props = {
	onSearch: (query: string) => void;
	searchResults: ChatMessage[];
	onJumpTo: (index: number) => void;
	chatHistory: ChatMessage[];
};

export interface SearchResultListProps {
	message: any;
	maxResultsToShow: any;
	results: any;
	title: any;
}
