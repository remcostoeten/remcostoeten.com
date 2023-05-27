import { useState, useEffect } from 'react';

const Cursor = () => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isGrow, setGrow] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};

		const handleMouseEnter = () => {
			setGrow(true);
		};

		const handleMouseLeave = () => {
			setGrow(false);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseenter', handleMouseEnter);
		document.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseenter', handleMouseEnter);
			document.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return (
		<div
			className={`fixed w-25 h-25 rounded-full bg-purple-500 pointer-events-none mix-blend-overlay filter blur-lg transition-transform duration-300 ${
				isGrow ? 'w-150 h-150' : ''
			}`}
			style={{
				left: cursorPosition.x - 12.5,
				top: cursorPosition.y - 12.5,
			}}
		/>
	);
};

export default Cursor;
