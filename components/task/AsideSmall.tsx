import React, { useState } from 'react';

import Link from 'next/link';
import {
	AppsOutlined,
	CalendarToday,
	LoginSharp,
	VerifiedUserSharp,
	ViewList,
	AssignmentInd,
	LogoutOutlined,
} from '@mui/icons-material';
import { auth } from '@/utils/firebase';

interface AsideSmallProps {
	view: string;
	isLoggedIn: boolean;
}

export default function AsideSmall({ isLoggedIn }: AsideSmallProps) {
	const currentUrl =
		typeof window !== 'undefined' ? window.location.pathname : '';
	const currentRouteClass = currentUrl.substring(1);

	return (
		<>
			<aside className='nav'>
				<nav className='nav__small'>
					<div className='nav__top'>
						<Link href='/'>
							<span
								className={
									'logo ' + (isLoggedIn ? 'logged-in' : '')
								}>
								<svg
									width='30'
									height='32'
									viewBox='0 0 36 32'
									fill='#000" '
									className='css-1170n61'>
									<path
										fillRule='evenodd'
										clipRule='evenodd'
										d='M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7
234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z'
										fill='#000'></path>
								</svg>
							</span>
						</Link>
						<Link href='/tasks'>
							<span
								className={`icon task ${
									currentRouteClass === 'tasks'
										? 'active'
										: ''
								}`}>
								<CalendarToday />C{' '}
							</span>
						</Link>
						<Link href='/calender'>
							<span
								className={`icon calendar ${
									currentRouteClass === 'calendar'
										? 'active'
										: ''
								}`}>
								<CalendarToday />
							</span>
						</Link>
						<span
							className={`icon board ${
								currentRouteClass === 'board' ? 'active' : ''
							}`}>
							<AppsOutlined />
						</span>
						<span
							className={`icon list ${
								currentRouteClass === 'list' ? 'active' : ''
							}`}>
							<ViewList />
						</span>

						<span
							className={`icon logbook ${
								currentRouteClass === 'logbook' ? 'active' : ''
							}`}>
							<VerifiedUserSharp />
						</span>
					</div>
					<div className='nav__bottom'>
						<a className='logout' onClick={() => auth.signOut()}>
							<LogoutOutlined />
						</a>{' '}
					</div>
				</nav>
			</aside>
		</>
	);
}
