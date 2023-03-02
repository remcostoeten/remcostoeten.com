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

export interface ChatMessage {
	id: string;
	message: string;
	type: 'sent' | 'received';
	attachments?: Attachment[];
	sender: string;
	timestamp: Date;
}
