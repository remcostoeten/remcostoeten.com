import React from 'react';
import Link from 'next/link';
import {
	AppsOutlined,
	CalendarMonth,
	Diamond,
	LoginSharp,
	LogoutSharp,
	VerifiedUserSharp,
	ViewList,
} from '@mui/icons-material';
import { signIn, signOut } from '@/authentication/LoginLogic';

interface AsideSmallProps {
	view: string;
	isLoggedIn: boolean;
}

export default function AsideSmall({ view, isLoggedIn }: AsideSmallProps) {
	return (
		<>
			<aside className='nav'>
				<nav className='nav__small'>
					<div className='nav__top'>
						<Link href='/'>
							<span className='logo'></span>
						</Link>
						<span className={view === 'board' ? 'active' : ''}>
							<AppsOutlined />
						</span>
						<span className={view === 'list' ? 'active' : ''}>
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
						{isLoggedIn ? (
							<>
								<span onClick={signOut}>
									<LogoutSharp />
								</span>
							</>
						) : (
							<span onClick={signIn}>
								<LoginSharp />
							</span>
						)}
					</div>
				</nav>
			</aside>
		</>
	);
}
