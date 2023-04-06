import React, { useState, useEffect } from 'react';

const WipNotice: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const isSeen = localStorage.getItem('wipNoticeSeen');

		if (!isSeen) {
			setIsVisible(true);
		}
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		localStorage.setItem('wipNoticeSeen', 'true');
	};

	if (!isVisible) return null;

	return (
		<div className='wip-alert'>
			<div className='modal'>
				<div className='wip-alert__inner wip__alert'>
					<p>
						This site is a work in progress, and some pages may be
						broken. Thank you for your understanding.
					</p>
					<button
						className='btn btn--secondary'
						onClick={handleClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default WipNotice;
