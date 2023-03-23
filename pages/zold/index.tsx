import ChatHistory from '@/components/Chat/PrivateChats';
import Header from '@/components/header/Header';

const PrivateChat = () => {
	return (
		<>
			<Header />
			<div>
				<ChatHistory pageSize={20} filename='y' />
			</div>
		</>
	);
};

export default PrivateChat;
