import React from 'react';
import { Message } from '@/utils/firebase';
import Chat from './Chatv2';
import Header from '../header/Header';

interface WithChatProps {
	getChatHistory: () => Promise<Message[] | null>;
}

const withChat = (getChatHistory: WithChatProps['getChatHistory']) => {
	const WrappedComponent: React.FC = () => {
		return (
			<>
				<Header />
				<Chat getChatHistory={getChatHistory} />
			</>
		);
	};

	return WrappedComponent;
};

export default withChat;
