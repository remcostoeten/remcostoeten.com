import React, { useState } from 'react';

import Link from 'next/link';
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
					<Link href='/' onClick={handleCloseMenu}>
						<LogoIcon />
					</Link>
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
