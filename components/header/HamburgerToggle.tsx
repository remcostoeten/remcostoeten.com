import React from 'react';

interface HamburgerToggleProps {
	isOpen: boolean;
	onToggle: (isOpen: boolean) => void;
}

export const HamburgerToggle: React.FC<HamburgerToggleProps> = ({
	isOpen,
	onToggle,
}) => {
	const handleClick = () => {
		onToggle(!isOpen);
	};

	return (
		<button
			className={`hamburger-toggle ${isOpen ? 'active' : ''}`}
			onClick={handleClick}>
			<span className='line'></span>
			<span className='line'></span>
		</button>
	);
};
