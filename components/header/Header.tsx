import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, singInWithGoogle } from '../../firebase';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
	const [showTagline, setShowTagline] = useState(true);
	const [minimalSticky, setmMinimalSticky] = useState(true);
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showWelcome, setShowWelcome] = useState(true);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const headerVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const handleLoginClick = () => {
		setShowLoginModal(true);
	};

	const handleCloseModal = () => {
		setShowLoginModal(false);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				document.body.classList.add('scrolled');
				setShowTagline(false);
				setmMinimalSticky(false);
			} else {
				document.body.classList.remove('scrolled');
				setShowTagline(true);
				setmMinimalSticky(true);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserName(user.displayName);
			} else {
				setIsLoggedIn(false);
				setUserName(null);
			}
		});
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowWelcome(false);
		}, 3000); // Hide the welcome message after 3 seconds
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			<motion.header
				className='header top-header'
				variants={headerVariants}
				initial='hidden'
				animate='visible'>
				<div className='container header__inner'>
					<Link href='/'>
						<motion.div
							className='header__user'
							whileHover={{ scale: 1.05 }}>
							<div className='header__user-image-wrapper'>
								{isLoggedIn && auth.currentUser?.photoURL ? (
									<div className='header__user-image-wrapper'>
										<Image
											src={auth.currentUser.photoURL}
											width={48}
											height={48}
											className='header__user-image'
											alt={''}
										/>
									</div>
								) : null}
							</div>
							<motion.div
								className='header__user-wrapper'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}>
								{auth.currentUser ? (
									<motion.div
										className='header__user-name-wrapper'
										whileHover={{ scale: 1.05 }}>
										<span className='header__user-name'>
											<span>{userName} </span>
											<span className='email'>
												{auth.currentUser?.email
													? `${auth.currentUser?.email}`
													: ''}
											</span>
										</span>
									</motion.div>
								) : (
									<h2>Logo</h2>
								)}
							</motion.div>
						</motion.div>
					</Link>
					<nav className='header__menu'>
						<ul>
							{isLoggedIn &&
							auth.currentUser?.email ===
								'stoetenremco.rs@gmail.com' ? (
								<div>
									<Button
										id='demo-positioned-button'
										aria-controls={
											open
												? 'demo-positioned-menu'
												: undefined
										}
										aria-haspopup='true'
										aria-expanded={
											open ? 'true' : undefined
										}
										onClick={handleClick}>
										Dashboard
									</Button>
									<Menu
										id='demo-positioned-menu'
										aria-labelledby='demo-positioned-button'
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}>
										<MenuItem>
											<Link href='/zold'>z old</Link>{' '}
										</MenuItem>
										<MenuItem>
											<Link href='/znew'>znew</Link>{' '}
										</MenuItem>
										<MenuItem>
											<Link href='/y'>y</Link>{' '}
										</MenuItem>{' '}
										<MenuItem>
											<Link href='/d'>d</Link>{' '}
										</MenuItem>
									</Menu>
								</div>
							) : null}
							<Link href='/test-history'>Messenger</Link>
							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/message-history'>Messenger</Link>
							</motion.li>
							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/whatsapp-export'>
									Chat feature
								</Link>
							</motion.li>

							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/contact'>Contact</Link>
							</motion.li>
							<motion.li whileHover={{ scale: 1.05 }}>
								<a
									href='https://github.com/remcostoeten/'
									target='_blank'
									rel='noreferrer'>
									Github
								</a>
							</motion.li>
							{isLoggedIn ? (
								<motion.li whileHover={{ scale: 1.05 }}>
									<a onClick={() => auth.signOut()}>Logout</a>
								</motion.li>
							) : (
								<motion.li whileHover={{ scale: 1.05 }}>
									<a onClick={singInWithGoogle}>Login</a>
								</motion.li>
							)}
						</ul>
					</nav>
				</div>
			</motion.header>
		</>
	);
};

export default Header;
