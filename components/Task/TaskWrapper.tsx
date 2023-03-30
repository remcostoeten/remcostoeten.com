import TaskWrapper from '@/components/Task/TaskWrapper';
import React, { useState } from 'react';
import { signIn, signOut } from '@/utils/LoginLogic';
import AsideSmall from '@/components/Task/AsideSmall';
import AsideBig from '@/components/Task/AsideBig';
import { CheckCircle, KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import Lost from '@/components/Lost';
import { GoogleAuthProvider, auth, signInWithPopup } from '@/utils/firebase';
import SignupLink from '@/components/header/SignupLink';
import { signInWithEmailAndPassword } from '@firebase/auth';

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const toggleTheme = () => {
		if (document.body.classList.contains('theme-white')) {
			document.body.classList.remove('theme-white');
			document.body.classList.add('theme-dark');
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-white');
		}
	};

	const signIn = async (
		setIsLoggedIn: (value: boolean) => void,
		email?: string,
		password?: string,
	) => {
		try {
			let result;
			if (email && password) {
				result = await signInWithEmailAndPassword(
					auth,
					email,
					password,
				);
			} else {
				result = await signInWithPopup(auth, new GoogleAuthProvider());
			}
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className='todo'>
				<div className='todo__inner'>
					<AsideSmall view={''} isLoggedIn={false} />
				</div>
			</div>
		</>
	);
}
