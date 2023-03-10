import React from 'react';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Friends() {
	return (
		<>
			<div className='chat-previews'>
				<div className='chat'>
					<div className='chat__friend unread'>
						<Image
							// src='/majin-buu-happy.jpg'
							src='/buu.webp'
							alt='Majin Buu'
							width={40}
							height={40}
						/>
						<div className='chat__info'>
							<h3>Majin Buu</h3>
							<p>
								Hey, how are you? I have fowardewd you the
								message of last week.
							</p>
						</div>
						<div className='chat__timestamp'></div>
						<div className='chat__pin'>
							<FavoriteBorderIcon color='disabled' />
						</div>
					</div>
					<div className='chat__friend'>
						<Image
							// src='/majin-buu-happy.jpg'
							src='/peter.jpg'
							alt='Peter Griffin'
							width={40}
							height={40}
						/>
						<div className='chat__info'>
							<h3>Majin Buu</h3>
							<p>
								Hey, how are you? I have fowardewd you the
								message of last week.
							</p>
						</div>
						<div className='chat__timestamp'></div>
						<div className='chat__pin'>
							<FavoriteBorderIcon color='disabled' />
						</div>
					</div>
				</div>
			</div>
			<div className='messenger__chat'></div>
		</>
	);
}
