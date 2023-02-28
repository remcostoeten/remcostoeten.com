interface Message {
	attachments?: {
		photo?: string;
		format?: string;
		device?: string;
	};
	sender?: string;
	timestamp?: string;
	message?: string;
	chatfrom?: string;
}

interface ChatHistoryProps {
	chatHistory: Message[];
}
