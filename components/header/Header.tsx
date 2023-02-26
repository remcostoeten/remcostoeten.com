import React from 'react';
import Authentication from './AuthenticationHeader';
import Logo from './Logo';
export default function Header() {
	return (
		<>
			<header className='container header'>
				<Logo />
				<Authentication />
			</header>
		</>
	);
}
