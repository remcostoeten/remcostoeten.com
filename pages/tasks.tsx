import TaskWrapper from '@/components/task/TaskWrapper';
import React, { useEffect, useState } from 'react';
import AsideSmall from '@/components/task/AsideSmall';
import { KeyboardBackspace, LogoutSharp } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/task/Lost';
import { auth, GoogleAuthProvider, signInWithPopup } from '@/utils/firebase';
import Confetti from 'react-confetti';
import SignIn from '@/components/task/SignIn';
import { ToastContainer, toast } from 'react-toastify';
import {
	getAuth,
	browserLocalPersistence,
	browserSessionPersistence,
	setPersistence,
	createUserWithEmailAndPassword,
} from '@firebase/auth';
import SlideButton from '@/components/ui-elements/buttons/RetroButton';

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [rememberMe, setRememberMe] = useState(true);

	const toggleTheme = () => {
		if (document.body.classList.contains('theme-white')) {
			document.body.classList.remove('theme-white');
			document.body.classList.add('theme-dark');
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-white');
		}
	};

	const handleSignInModalClose = () => {
		setIsSignInModalOpen(false);
	};

	const handleSignInButtonClick = () => {
		setIsSignInModalOpen(true);
	};

	const signInUser = async (
		email?: string,
		password?: string,
		rememberMe?: boolean,
	) => {
		if (!email || !password) {
			toast.error('Please provide a valid email and password.');
			return;
		}
		try {
			const auth = getAuth();
			const persistenceMode = rememberMe
				? browserLocalPersistence
				: browserSessionPersistence;
			await setPersistence(auth, persistenceMode);
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			console.log(result);
			localStorage.setItem('email', email);
			localStorage.setItem('password', password);
			if (!auth.currentUser?.displayName === null) {
				toast.success(
					`Welcome aboard ${auth.currentUser?.displayName}!`,
				);
			} else {
				toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
			}
		} catch (error) {
			console.error(error);
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (showConfetti) {
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, 5000); // Hide confetti after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [showConfetti]);

	return (
		<>
			<div className='todo'>
				<div className='todo__inner flex'>
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
										obviously don `&apos;`t want another
										user to edit your tasks, do you?
									</p>
									<div className='not-authorized__buttons'>
										{isLoggedIn ? (
											<SlideButton
												icon={LogoutSharp}
												label=''
												onClick={() => auth.signOut()}
												textColor='text-indigo-600'
												borderColor='border-2 border-indigo-600'
											/>
										) : (
											<SlideButton
												icon={KeyboardBackspace}
												label='Sign In'
												textColor='text-indigo-600'
												borderColor='border-2 border-indigo-600'
												onClick={
													handleSignInButtonClick
												}
											/>
										)}
										<SlideButton
											icon={KeyboardBackspace}
											label='Or return home'
											link='/'
											textColor='text-indigo-600'
											borderColor='border-2 border-indigo-600'
										/>
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
			{isSignInModalOpen && (
				<SignIn
					onClose={handleSignInModalClose}
					onSignIn={(email, password, rememberMe) =>
						signInUser(email, password, rememberMe)
					}
					setShowRegisterModal={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			)}
			<ToastContainer />
			{showConfetti && <Confetti />}
		</>
	);
}
