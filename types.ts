export interface ChatMessage {
	id: string;
	message: string; // <-- add this property
	type: 'sent' | 'received';
	attachments: Attachment[];
	sender: string;
	timestamp: Date;
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
	data: any;
}
