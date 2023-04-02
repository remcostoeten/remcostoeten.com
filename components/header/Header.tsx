import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, signInWithGoogle } from '@/utils/firebase';
import { motion } from 'framer-motion';
import { Logout } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import OffcanvasMenu from './OffcanvasMenu';
import useMediaQuery from '@mui/material/useMediaQuery';
import SignupLink from './SignupLink';
import { Button } from '@mui/material';
import AdminMenu from './AdminMenu';

const Header = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showTagline, setShowTagline] = useState(true);
	const [minimalSticky, setmMinimalSticky] = useState(true);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const isMobile = useMediaQuery('(max-width: 768px)');
	const open = Boolean(anchorEl);
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
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

	const [variant, setVariant] = useState('theme--variant');

	useEffect(() => {
		document.body.classList.add('variant');
	}, []);

	return (
		<>
			<motion.header
				className='header top-header'
				variants={headerVariants}
				initial='hidden'
				animate='visible'>
				<div className='container header__inner'>
					{isLoggedIn &&
					auth.currentUser?.email === 'stoetenremco.rs@gmail.com' ? (
						<AdminMenu />
					) : null}

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
									<h2></h2>
								)}
							</motion.div>
						</motion.div>
					</Link>
					{!isMobile && (
						<>
							<nav className='header__menu'>
								<ul>
									{isLoggedIn &&
									auth.currentUser?.email ===
										process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
										<li>
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
												Personal exports
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
													<Link href='/zold'>
														{
															process.env
																.NEXT_PUBLIC_CHAT_ONE
														}
													</Link>
												</MenuItem>
												<MenuItem>
													<Link href='/znew'>
														{
															process.env
																.NEXT_PUBLIC_CHAT_TWO
														}
													</Link>
												</MenuItem>
												<MenuItem>
													<Link href='/y'>
														{
															process.env
																.NEXT_PUBLIC_CHAT_THREE
														}
													</Link>
												</MenuItem>
												<MenuItem>
													<Link href='/d'>
														{
															process.env
																.NEXT_PUBLIC_CHAT_FOUR
														}
													</Link>
												</MenuItem>
											</Menu>
										</li>
									) : null}
									<motion.li whileHover={{ scale: 1.05 }}>
										<Link href='/tasks'>
											Todo list creator
										</Link>
									</motion.li>
									<motion.li whileHover={{ scale: 1.05 }}>
										<Link href='/message-history'>
											Messenger
										</Link>
									</motion.li>
									<motion.li whileHover={{ scale: 1.05 }}>
										<Link href='/whatsapp'>Chat</Link>
									</motion.li>
									<motion.li whileHover={{ scale: 1.05 }}>
										<a
											href='https://github.com/remcostoeten/'
											target='_blank'
											rel='noreferrer'>
											Github
										</a>
									</motion.li>
								</ul>
							</nav>
							<div className='header__login'>
								{isLoggedIn ? (
									<motion.li whileHover={{ scale: 1.05 }}>
										<React.Fragment>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													textAlign: 'center',
												}}>
												<Tooltip title='Click to logout'>
													<IconButton
														onClick={handleClick}
														size='small'
														sx={{ ml: 2 }}
														aria-controls={
															open
																? 'account-menu'
																: undefined
														}
														aria-haspopup='true'
														aria-expanded={
															open
																? 'true'
																: undefined
														}>
														<Avatar
															sx={{
																width: 32,
																height: 32,
															}}>
															{userName?.slice(
																0,
																1,
															)}
														</Avatar>
													</IconButton>
												</Tooltip>
											</Box>
											<Menu
												anchorEl={anchorEl}
												id='account-menu'
												open={open}
												onClose={handleClose}
												onClick={handleClose}
												PaperProps={{
													elevation: 0,
													sx: {
														overflow: 'visible',
														filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
														mt: 1.5,
														'& .MuiAvatar-root': {
															width: 32,
															height: 32,
															ml: -0.5,
															mr: 1,
														},
														'&:before': {
															content: '""',
															display: 'block',
															position:
																'absolute',
															top: 0,
															right: 14,
															width: 10,
															height: 10,
															bgcolor:
																'background.paper',
															transform:
																'translateY(-50%) rotate(45deg)',
															zIndex: 0,
														},
													},
												}}
												transformOrigin={{
													horizontal: 'right',
													vertical: 'top',
												}}
												anchorOrigin={{
													horizontal: 'right',
													vertical: 'bottom',
												}}>
												<Divider />
												<MenuItem
													onClick={() =>
														auth.signOut()
													}>
													<ListItemIcon>
														<Logout fontSize='small' />
													</ListItemIcon>
													Logout
												</MenuItem>
											</Menu>
										</React.Fragment>
										<a onClick={() => auth.signOut()}></a>
									</motion.li>
								) : (
									// <motion.li whileHover={{ scale: 1.05 }}>
									<SignupLink />
									// </motion.li>
								)}
							</div>
						</>
					)}
					<OffcanvasMenu />
				</div>
			</motion.header>
		</>
	);
};

export default Header;
