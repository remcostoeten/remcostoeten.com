import React, { useEffect, useState } from 'react';
const ChatBubbleAlert = () => {
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowAlert(true);
		}, 2000);
	}, []);

	const handleClose = () => {
		setShowAlert(false);
	};

	return (
		<div className='App'>
			{showAlert && (
				<div className='alert-container'>
					<div className='alert-box'>
						<p>You can click on a result to jump to the message.</p>
						<div className='close-btn' onClick={handleClose}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='#fff '
								viewBox='0 0 16 16'>
								<path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
							</svg>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default ChatBubbleAlert;
