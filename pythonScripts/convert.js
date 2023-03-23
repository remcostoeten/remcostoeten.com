const moment = require('moment');
const fs = require('fs');

const inputFile = './chatHistory.json';
const outputFile = './convertedChatHistory.json';

const chatHistory = JSON.parse(fs.readFileSync(inputFile));

const convertedChatHistory = chatHistory.map(
	({ timestamp, name, message, image }) => {
		const formattedTimestamp = moment(
			timestamp,
			'DD/MM/YYYY, HH:mm:ss',
		).toISOString();
		return {
			name,
			message,
			timestamp: formattedTimestamp,
			image,
		};
	},
);

fs.writeFileSync(outputFile, JSON.stringify(convertedChatHistory, null, 2));
