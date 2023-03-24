import ChatHistory from '@/components/Chat/PrivateChats';
import Header from '@/components/header/Header';

const PrivateChat = () => {
	return (
		<>
			<Header />
			<h3>Z new</h3>
			<div>
				<ChatHistory pageSize={20} filename='znew' />
			</div>
		</>
	);
};

export default PrivateChat;
