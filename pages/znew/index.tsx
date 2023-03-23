import ChatHistory from '@/components/Chat/PrivateChats';
import Header from '@/components/header/Header';

const PrivateChat = () => {
	return (
		<>
			<Header />
			<div>
				<ChatHistory pageSize={20} filename='zold' />
			</div>
		</>
	);
};

export default PrivateChat;
