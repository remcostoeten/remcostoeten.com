import React from 'react';
import { useRouter } from 'next/router';
import Logo from '../ui-elements/Logo';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import BuildIcon from '@mui/icons-material/Build';
import { signInWithGoogle, auth, signOut } from '@/utils/firebase';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

export default function Aside() {
	let menuClass = 'text-slate-300 p-4 rounded-lg flex items-center font-bold';
	const menuItems = [
		{
			name: 'Dashboard',
			icon: <HomeIcon />,
			link: '/expenses',
		},
		{
			name: 'Tasks',
			icon: <FormatListNumberedIcon />,
			link: '/tasks',
		},
		{
			name: 'Text extractor tool',
			icon: <BuildIcon />,
			link: '/url-filtering-tool',
		},
		{
			name: auth.currentUser ? 'Logout' : 'Login',
			icon: auth.currentUser ? <LockIcon /> : <LockOpenIcon />,
			action: auth.currentUser ? signOut : signInWithGoogle,
		},
	];

	const { pathname } = useRouter();

	return (
		<aside className="w-1/4 bg-gray-900 pt-6 pl-8 pr-8 mr-8 rounded h-screen">
			<Logo />
			<ul className="mt-8">
				{menuItems.map((menuItem) => (
					<li key={menuItem.link || menuItem.name}>
						{menuItem.link ? (
							<Link
								className={`${
									menuItem.link === pathname
										? 'bg-teal-400 text-slate-900 '
										: ''
								}${menuClass}`}
								href={menuItem.link}
							>
								{menuItem.icon}
								<span className="ml-4">{menuItem.name}</span>
							</Link>
						) : (
							<button
								className={`${menuClass}`}
								onClick={menuItem.action}
							>
								{menuItem.icon}
								<span className="ml-4">{menuItem.name}</span>
							</button>
						)}
					</li>
				))}
			</ul>
		</aside>
	);
}
