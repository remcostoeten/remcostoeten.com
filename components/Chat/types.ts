import { ChatMessage } from '@/types';

export interface ChatSearchProps {
	onSearch: (searchTerm: string) => void;
	searchResults: string;
	chatHistory: ChatMessage[];
	onJumpTo: (index: number) => void;
}
