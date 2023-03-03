import React, { useEffect, useState } from 'react';
const ChatBubbleAlert = () => {
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowAlert(true);
		}, 0);
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
							X
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default ChatBubbleAlert;
