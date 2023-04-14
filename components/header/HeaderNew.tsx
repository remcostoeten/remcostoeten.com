import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SvgLogo from './SvgLogo';
import { HamburgerToggle } from './HamburgerToggle';

export default function HeaderNew() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
			} else {
				document.body.classList.remove('scrolled');
			}
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div className='header'>
				<div className='header__inner'>
					<div className='header__left'>
						<Link href='/'>
							<SvgLogo />
						</Link>
					</div>
					<div>
						<HamburgerToggle
							isOpen={menuOpen}
							onToggle={setMenuOpen}
						/>
						{menuOpen && (
							<nav>{/* Add your menu items here */}</nav>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
