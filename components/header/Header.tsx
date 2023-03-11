import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fb, auth, singInWithGoogle } from '../../firebase';
import IconButton from '@mui/material/IconButton';
import { Info } from '@mui/icons-material';
import { motion } from 'framer-motion';
const Header = () => {
	const [showTagline, setShowTagline] = useState(true);
	const [minimalSticky, setmMinimalSticky] = useState(true);
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showWelcome, setShowWelcome] = useState(true);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const handleOpen = () => setShowLoginModal(true);
	const handleClose = () => setShowLoginModal(false);

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
							{minimalSticky && (
								<Image
									src='/remco.png'
									alt='Remco'
									width={90}
									height={90}
								/>
							)}
							{userName ? (
								<div>
									<p>Logged in as {userName}</p>
								</div>
							) : (
								<div
									className={`header__tagline ${
										showTagline ? 'visible' : ''
									}`}>
									{/* <h3>remcostoeten</h3> */}
									{showTagline && (
										<h4>front-end developer</h4>
									)}
								</div>
							)}
						</motion.div>
					</Link>
					<nav className='header__menu'>
						<ul>
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
