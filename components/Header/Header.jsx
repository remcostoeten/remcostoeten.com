import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SvgLogo from './SvgLogo';
import Toggle from './Toggle';
import RemcoLogoThree from './Logo';
import LogoIcon from '../svg-elements/LogoIcon';
export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	return (
		<div className={`header ${scrolled ? 'scrolled' : ''}`}>
			<div className='header__inner container'>
				<div className='header__left'>
					<Link href='/'>
						<LogoIcon />
					</Link>
				</div>
				<Toggle />
			</div>
		</div>
	);
}
