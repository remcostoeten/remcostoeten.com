import Image from 'next/image';
import MessagePreview from './MessagePreview';
import yData from '../../private-apis/data/y.json';
import znewData from '../../private-apis/data/znew.json';
import zoldData from '../../private-apis/data/zold.json';
import whatsappData from '../../pages/whatsapp-export/ChatHistory.json';

const avatarSize = 45;

export default function Friends() {
	const chats = [
		yData[yData.length - 1],
		whatsappData[whatsappData.length - 1],
		znewData[znewData.length - 1],
		zoldData[zoldData.length - 1],
	];

	function getChatSummaries(chats) {
		const chatSummaries = {};

		chats.forEach((chat) => {
			const name = chat.name ?? chat.firstName;
			if (!chatSummaries[name]) {
				chatSummaries[name] = {
					firstName: chat.firstName ?? chat.name ?? '',
					avatar: chat.Avatar ?? '',
					lastMessage: chat.message ?? chat.text ?? '',
					timestamp: chat.timestamp,
				};
			}
		});

		return chatSummaries;
	}

	const yChatSummaries = getChatSummaries([yData[yData.length - 1]]);
	const whatsappChatSummaries = getChatSummaries([
		whatsappData[whatsappData.length - 1],
	]);
	const znewChatSummaries = getChatSummaries([znewData[znewData.length - 1]]);
	const zoldChatSummaries = getChatSummaries([zoldData[zoldData.length - 1]]);

	return (
		<>
			<div className='chat-previews'>
				<div className='chat'>
					{chats.map((chatData) => (
						<MessagePreview
							key={chatData.timestamp}
							chatData={chatData}
						/>
					))}
				</div>
			</div>
			<div className='messenger__chat'></div>
		</>
	);
}
