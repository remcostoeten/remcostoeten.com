//codepen.io/ifebronr/pen/wvWapGO

import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import {
	CancelOutlined,
	Email,
	Logout,
	Menu,
	WhatsApp,
} from '@mui/icons-material';
import Login from '../GoogleLogin';
import { auth, logout, signInWithGoogle } from '@/utils/firebase';
import { useMediaQuery } from '@mui/material';
import { Box, motion } from 'framer-motion';
function bodyClass({}) {}

function OffcanvasMenu() {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 768 && menuOpen) {
			setMenuOpen(false);
		}
	}, [size.width, menuOpen]);

	const menuToggleHandler = () => {
		setMenuOpen((p: any) => !p);
		document.body.classList.add('menuOpen');
	};
	useEffect(() => {
		if (menuOpen === false) {
			document.body.classList.remove('menuOpen');
		}
	});
	function handleSignInButtonClick(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	): void {
		throw new Error('Function not implemented.');
	}

	return (
		<div className='header__content'>
			<nav
				className={`${'header__content__nav'} 
			${menuOpen && size.width < 768 ? `${'isMenu'}` : ''} 
			}`}></nav>

			<div className='offcanvas'>
				{!menuOpen ? (
					<div className='hamburger' onClick={menuToggleHandler}>
						<div className='hamburger__line'></div>
						<div className='hamburger__line'></div>
						<div className='hamburger__line'></div>
					</div>
				) : (
					<>
						<div className='close' onClick={menuToggleHandler}>
							<div className='close__line'></div>
						</div>
						<div className='offcanvas__inner'>
							<div className='header__offcanvas'>
								<div
									className='header__offcanvas__inner'
									onClick={menuToggleHandler}>
									<div className='header__close'>
										<CancelOutlined />
									</div>
									<Login />

									<Link href='/message-history'>
										Messenger
									</Link>
									<Link href='/tasks'>Todo app</Link>
									<Link href='/whatsapp-export'>Chat</Link>
									<Link
										href='https://github.com/remcostoeten/'
										target='_blank'
										rel='noreferrer'>
										Github
									</Link>
								</div>
								<div className='actions'>
									<a href='https://wa.me/31636590707'>
										<WhatsApp />
									</a>
									<a
										href='mailto:remcostoeten@hotmail.com'
										target='_blank'
										rel='noreferrer'>
										<Email />
									</a>
								</div>
							</div>
						</div>
						{isLoggedIn ? (
							<motion.li whileHover={{ scale: 1.05 }}>
								<a onClick={() => auth.signOut()}>Logout</a>
							</motion.li>
						) : (
							<>
								<div
									className='login-btn'
									onClick={handleSignInButtonClick}>
									<span>Sign In</span>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default OffcanvasMenu;
