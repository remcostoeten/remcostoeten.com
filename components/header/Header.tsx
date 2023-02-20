import React from 'react';
import OffcanvasMenu from './OffcanvasMenu';
import Logo from './Logo';
export default function Header() {
	return (
		<>
			<header className='header'>
				<Logo />
				<OffcanvasMenu />
			</header>
		</>
	);
}
