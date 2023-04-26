import Link from 'next/link';
import React, { useState } from 'react';
import LogoIcon from '../svg-elements/LogoIcon';
import Toggle from './Toggle';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleCloseMenu = () => {
		setMenuOpen(false);
	};

	return (
		<div className={`header ${menuOpen ? 'menu-open' : ''}`}>
			<div className='header__inner container'>
				<div className='header__left'>
					<a href='/' onClick={handleCloseMenu}>
						<LogoIcon />
					</a>
				</div>
				<Toggle
					menuOpen={menuOpen}
					setMenuOpen={setMenuOpen}
					handleCloseMenu={handleCloseMenu}
				/>
			</div>
		</div>
	);
}
