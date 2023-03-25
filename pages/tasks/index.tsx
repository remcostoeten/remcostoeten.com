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

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);
	const [showTagline, setShowTagline] = useState(true);
	const [minimalSticky, setmMinimalSticky] = useState(true);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);
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

	const signIn = async () => {
		try {
			const result = await signInWithPopup(
				auth,
				new GoogleAuthProvider(),
			);
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
			setIsLoggedIn(false);
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
							<div className='authenticated'>
								<TaskWrapper />
							</div>
						</>
					) : (
						<>
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
											<div className='cta'>
												<KeyboardBackspace />
												<SignupLink />
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
