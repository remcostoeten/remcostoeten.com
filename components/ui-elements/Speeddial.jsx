import React, { useState } from 'react';

const RotatedToggle = () => {
	const [isToggled, setIsToggled] = useState(false);

	const handleColorchange = () => {
		setIsToggled(!isToggled);

		if (isToggled) {
			document.body.classList.remove('alternative-color');
		} else {
			document.body.classList.add('alternative-color');
		}
	};

	return (
		<div className='speeddial scale-50 fixed top-1/2 right-0 transform -translate-y-1/2'>
			<label
				htmlFor='toggle'
				className={`${
					isToggled ? 'bg-blue-500' : 'bg-red-500'
				} relative inline-block w-14 h-8 rounded-full overflow-hidden cursor-pointer transform -rotate-90`}>
				<input
					id='toggle'
					type='checkbox'
					checked={isToggled}
					onChange={handleColorchange}
					className='sr-only'
				/>
				<span className='absolute left-0 top-0 w-full bg-gray-300 rounded-full shadow-inner transition-colors duration-300'></span>
				<span
					className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
						isToggled
							? 'transform translate-x-6'
							: 'transform translate-x-0'
					}`}></span>
			</label>
		</div>
	);
};

export default RotatedToggle;
