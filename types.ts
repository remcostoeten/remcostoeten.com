import { ReactNode } from 'react';

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
	searchResults: ChatMessage[]; // Use ChatMessage instead of Message
	chatHistory: ChatMessage[]; // Use ChatMessage instead of Message
	onJumpTo: (message: ChatMessage) => void;
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
