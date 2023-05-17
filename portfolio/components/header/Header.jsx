import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import LogoIcon from '../svg-elements/logo/RemcoStoetenLogoIcon';
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
			className={`header top-0 flex align-middle w-full transition-all	 ${
				menuOpen ? 'menu-open' : ''
			} ${sticky ? 'sticky' : 'sticky'}`}>
			<div className='container justify-between items-center flex transition-width duration-500 ease-in-out'>
				<div className='header__left -ml-2'>
					<Link href='/' onClick={handleCloseMenu}>
						{/* <LogoIcon /> */}
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
