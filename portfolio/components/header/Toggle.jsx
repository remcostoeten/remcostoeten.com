import React from 'react';
import styles from './Toggle.module.scss';
import MenuButton from './offcanvas/MenuButton';
import OffcanvasMenuLinks from './OffcanvasMenuLinks';

const Toggle = ({ menuOpen, setMenuOpen, handleCloseMenu }) => {
	const handleToggle = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<div>
				<div onClick={handleToggle}>
					<MenuButton onClick={handleToggle} />
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					style={{ display: 'none' }}
				>
					<symbol
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 44 44"
						id="path"
					>
						<path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22"></path>
					</symbol>
				</svg>
			</div>
		</>
	);
};

export default Toggle;
