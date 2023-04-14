import { useState, useEffect } from 'react';
import MessagePreview from './MessagePreview';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@/utils/firebase';
const avatarSize = 45;

export default function Friends() {
	const [chats, setChats] = useState([]);
	const yChatSummaries = getChatSummaries([yData[yData.length - 1]]);
	const whatsappChatSummaries = getChatSummaries([
		whatsappData[whatsappData.length - 1],
	]);
	const znewChatSummaries = getChatSummaries([znewData[znewData.length - 1]]);
	const zoldChatSummaries = getChatSummaries([zoldData[zoldData.length - 1]]);

	async function fetchJSONDataFromStorage(filename) {
		try {
			const downloadURL = await getDownloadURL(
				ref(storage, filename), // Change this line
			);
			const response = await fetch(downloadURL);
			const jsonData = await response.json();
			return jsonData;
		} catch (error) {
			console.error('Error fetching data:', error);
			return [];
		}
	}

	useEffect(() => {
		async function fetchData() {	
			const yData = await fetchJSONDataFromStorage(
				'/private-apis/data/y.json',
			);
			const whatsappData = await fetchJSONDataFromStorage(
				'/private-apis/data/ChatHistory.json',
			);
			const znewData = await fetchJSONDataFromStorage(
				'/private-apis/data/znew.json',
			);
			const zoldData = await fetchJSONDataFromStorage(
				'/private-apis/data/zold.json',
			);
			setChats([
				yData[yData.length - 1],
				whatsappData[whatsappData.length - 1],
				znewData[znewData.length - 1],
				zoldData[zoldData.length - 1],
			]);
		}

		fetchData();
	}, []);

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
