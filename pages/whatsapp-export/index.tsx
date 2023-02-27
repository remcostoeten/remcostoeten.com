import React from 'react';
import ChatHistory from './ChatHistory';
import chatData from '../../api/chatDisplayData.json';

const WhatsAppPage: React.FC = () => {
	return (
		<div className='app'>
			<ChatHistory chatData={chatData} />
		</div>
	);
};

export default WhatsAppPage;
