import { useState } from 'react';

export default function Tooltip({ text }) {
	return (
		<>
			<div className='relative'>
				<span
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					className='cursor-pointer'>
					Hover over me
				</span>
				{showTooltip && (
					<div className='absolute z-10 top-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white rounded-md'>
						{text}
					</div>
				)}
			</div>
		</>
	);
}
