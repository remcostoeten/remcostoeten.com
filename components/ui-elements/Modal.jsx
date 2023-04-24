import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
	const overlayClasses = isOpen ? 'fixed inset-0 bg-black  z-50' : 'hidden';
	const modalClasses = isOpen
		? 'fixed inset-0 flex  justify-center z-50'
		: 'hidden';

	return (
		<div className={overlayClasses} onClick={onClose}>
			<div className={modalClasses} onClick={(e) => e.stopPropagation()}>
				<div className=''>
					<button
						className='absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none'
						onClick={onClose}>
						&#10005;
					</button>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
