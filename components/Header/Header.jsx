import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import LogoIcon from '../svg-elements/LogoIcon';
import Toggle from './Toggle';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [sticky, setSticky] = useState(false);

	const handleCloseMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleScroll = () => {
			setSticky(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			className={`header w-full fixed left-0 z-75 transition-all duration-300 ${
				menuOpen ? 'menu-open' : ''
			} ${sticky ? '' : 'bg-transparent'}`}>
			<div className='header__inner flex justify-between items-center h-full mx-auto relative transition-width duration-500 ease-in-out'>
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
