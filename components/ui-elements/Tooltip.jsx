import React, { useState } from 'react';

import { Info } from '@mui/icons-material';

const Tooltip = ({ title, text }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleMouseEnter = () => {
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};

	return (
		<div className='relative'>
			<Info
				className='h-4 w-4 text-gray-400 ml-1 inline-block align-middle'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}
				aria-label={title}
				role='button'
			/>
			{showTooltip && (
				<div className='bg-gray-100 text-gray-900 text-xs rounded py-1 px-4 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10'>
					{title && <h2 className='font-bold mb-2'>{title}</h2>}
					<p className='mb-0'>{text}</p>
				</div>
			)}
		</div>
	);
};

export default Tooltip;
