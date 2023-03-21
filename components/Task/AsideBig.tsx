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
import { signIn, signOut } from '@/utils/LoginLogic';

export default function AsideBig() {
	return (
		<>
			<aside className='nav'>
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
