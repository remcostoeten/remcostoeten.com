import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SvgLogo from './SvgLogo';
import { HamburgerToggle } from './HamburgerToggle';
import Toggle from './Toggle';

export default function HeaderNew() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className='inner'>
				<div className='left'>
					<Link href='/'>
						<SvgLogo />
					</Link>
				</div>
				<div>
					<Toggle />
					<HamburgerToggle isOpen={menuOpen} onToggle={setMenuOpen} />
					{menuOpen && <nav>{/* Add your menu items here */}</nav>}
				</div>
			</div>
		</div>
	);
}
