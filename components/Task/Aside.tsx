import { signIn, signOut } from '../../authentication/LoginLogic';
import {
	AppsOutlined,
	CalendarMonth,
	Diamond,
	LogoutSharp,
	VerifiedUserSharp,
	ViewList,
} from '@mui/icons-material';
import React, { useState } from 'react';
import Logo from '../header/Logo';
import Link from 'next/link';

export default function Aside() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleSignIn = async () => {
		try {
			const user = await signIn();
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut();
			setIsLoggedIn(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<aside className='nav'>
				<nav className='nav__small'>
					<div className='nav__top'>
						<Link href='/'>
							<span className='logo'>
								<Logo />
							</span>
						</Link>
						<span className='active'>
							<AppsOutlined />
						</span>
						<span>
							<ViewList />
						</span>
						<span>
							<Diamond />
						</span>
						<span>
							<CalendarMonth />
						</span>
						<span>
							<VerifiedUserSharp />
						</span>
					</div>
					<div className='nav__bottom'>
						<span onClick={handleSignOut}>
							<LogoutSharp />
						</span>
					</div>
				</nav>
				<div className='nav__big'>
					<h1>Projects</h1>
					<div className='projects'>
						<h3>Projects</h3>
						<ul>
							<li>All projects</li>
							<li>Design Systems</li>
							<li>User flwos</li>
						</ul>
					</div>
				</div>
			</aside>
		</>
	);
}
