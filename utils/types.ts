
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
	attachments?: Attachment[];
	sender: string;
	timestamp: Date;
}