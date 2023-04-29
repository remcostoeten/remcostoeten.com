import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const WarningMessage = () => {
	const [showTooltip, setShowTooltip] = useState(true);

	const handleTooltipClose = () => {
		Cookies.set('showTooltip', 'false', { expires: 7 });
		setShowTooltip(false);
	};

	useEffect(() => {
		const cookieValue = Cookies.get('showTooltip');
		setShowTooltip(cookieValue !== 'false');
	}, []);

	return (
		<>
			{showTooltip && (
				<div className='tooltip'>
					<p>
						This site is a work in progress and features are
						temporarily unavailable due to redesign.
					</p>
					<button onClick={handleTooltipClose}>Close</button>
				</div>
			)}
		</>
	);
};
