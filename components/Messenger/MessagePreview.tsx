import React from 'react';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ChatData } from './types';
import styles from './Messenger.module.css';

const avatarSize = 45;

export default function MessagePreview({ chatData }: { chatData: ChatData }) {
	return (
		<div className='chat__friend'>
			<Image
				src={chatData.image}
				alt={chatData.name}
				width={avatarSize}
				height={avatarSize}
			/>
			<div className='chat__info'>
				<h3>{chatData.name}</h3>
				<p>{chatData.message}</p>
			</div>
			<div className='chat__timestamp'>{chatData.timestamp}</div>
			<div className='chat__pin'>
				<FavoriteBorderIcon color='disabled' />
			</div>
		</div>
	);
}
