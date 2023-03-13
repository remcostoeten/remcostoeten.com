//codepen.io/ifebronr/pen/wvWapGO

import Link from 'next/link';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useState } from 'react';
import { CancelOutlined, Logout, Menu } from '@mui/icons-material';
import Login from '../Login';
import { auth } from '@/firebase';
import {
	Tooltip,
	IconButton,
	Avatar,
	Divider,
	MenuItem,
	ListItemIcon,
} from '@mui/material';
import { Box } from 'framer-motion';
function bodyClass({}) {}
function OffcanvasMenu() {
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
		setMenuOpen((p) => !p);
		document.body.classList.add('menuOpen');
	};
	useEffect(() => {
		if (menuOpen === false) {
			document.body.classList.remove('menuOpen');
		}
	});
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
								<div onClick={menuToggleHandler}>
									<div className='header__close'>
										<CancelOutlined />
									</div>
									<Login />

									<MenuItem onClick={() => auth.signOut()}>
										<ListItemIcon>
											<Logout fontSize='small' />
										</ListItemIcon>
										Logout
									</MenuItem>
									<Link href='/message-history'>
										Messenger feature
									</Link>
									<Link href='/whatsapp-export'>
										Chat feature
									</Link>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default OffcanvasMenu;
