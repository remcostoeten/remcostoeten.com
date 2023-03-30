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
					{isLoggedIn ? (
						<>
						
						
						
						</>
					) : (
						<>
							{' '}
							<div className='not-authorized'>
								<button
									className='toggleTheme'
									onClick={toggleTheme}>
									Toggle dark/light mode
								</button>
								<div className='not-authorized__inner'>
									<h2>
										Oops! Not authorized<br></br>for this
										page.
									</h2>
									<p>
										You should be logged in in order to use{' '}
										the task/to-do app.<br></br> You
										obviously don't want another user to
										edit your tasks, do you?
									</p>
									<div className='not-authorized__buttons'>
										<div className='item item--arrow'>
											<div
												className='cta'
												onClick={() =>
													signIn(
														setIsLoggedIn,
														email,
														password,
													)
												}>
												Sign In
											</div>
										</div>
										<div className='item item--arrow'>
											<div className='cta cta-two'>
												<Link href='/'>
													Or return home
												</Link>
												<KeyboardBackspace />
											</div>
										</div>
									</div>
								</div>
								<div className='lost'>
									<div className='lost__animation'>
										<Lost />
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
