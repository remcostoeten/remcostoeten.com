import React from 'react';
import OffcanvasMenu from './OffcanvasMenu';
import Logo from './Logo';
export default function Header() {
	return (
		<>
			<header className='header'>
				<Logo />
				<h2>remcostoeten</h2>
				<OffcanvasMenu />
			</header>
		</>
	);
}
