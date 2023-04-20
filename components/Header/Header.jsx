import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SvgLogo from './SvgLogo';
import Toggle from './Toggle';
import RemcoLogoThree from './Logo';
import Logo from './Logo';

export default function Header() {
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
			<div className='header__inner'>
				<div className='header__left'>
					<Link href='/'>
						{/* <RemcoSvgLogoOne /> */}
						{/* <RemcoLogoTwo /> */}
						<Logo />
					</Link>
				</div>
				<div>
					<Toggle />
				</div>
			</div>
		</div>
	);
}
