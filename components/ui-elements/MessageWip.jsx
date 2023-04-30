import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import React from 'react';

export default function MessageWip() {
	const [showTooltip, setShowTooltip] = useState(true);

	const handleTooltipClose    = () => {
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
				<div className='fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50'>
					<div
						id='toast-warning'
						className='toast flex items-center w-full max-w-md p-4 text-slate-500 bg-white rounded-lg shado'
						role='alert'>
						<div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200'>
							<svg
								aria-hidden='true'
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
									clipRule='evenodd'></path>
							</svg>
							<span className='sr-only'>Warning icon</span>
						</div>
						<div className='ml-3 text-xs font-normal'>
							This site is a work in progress, so there may be
							some issues and features are temporarily unavailable
							as I am implementing a redesign.
						</div>
						<button
							type='button'
							onClick={handleTooltipClose}
							className='ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 '
							data-dismiss-target='#toast-warning'
							aria-label='Close'>
							<span className='sr-only'>Close</span>
							<svg
								aria-hidden='true'
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clipRule='evenodd'></path>
							</svg>
						</button>
					</div>
				</div>
			)}
		</>
	);
}
