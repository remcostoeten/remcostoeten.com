// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
	return (
		<main className='loader-infinite'>
			<svg className='ip' viewBox='0 0 256 128' width='256px'>
				<g className='ip__track' stroke='#ddd'>
					<path d='M8,64s0-56,60-56,60,112,120,112,60-56,60-56' />
					<path d='M248,64s0-56-60-56-60,112-120,112S8,64,8,64' />
				</g>
				<g strokeDasharray='180 656'>
					<path
						className='ip__worm1'
						stroke='url(#grad1)'
						strokeDashoffset={0}
						d='M8,64s0-56,60-56,60,112,120,112,60-56,60-56'
					/>
					<path
						className='ip__worm2'
						stroke='url(#grad2)'
						strokeDashoffset={358}
						d='M248,64s0-56-60-56-60,112-120,112S8,64,8,64'
					/>
				</g>
			</svg>
		</main>
	);
};

export default LoadingSpinner;
