import TaskWrapper from '@/components/task/TaskWrapper';
import React, { useEffect, useState } from 'react';
import { KeyboardBackspace, LogoutSharp } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/svg-elements/Lost';
import { auth, GoogleAuthProvider, signInWithPopup } from '@/utils/firebase';
import Confetti from 'react-confetti';
import SignIn from '@/components/ui-elements/modals/SignIn';
import { ToastContainer, toast } from 'react-toastify';
import {
	getAuth,
	browserLocalPersistence,
	browserSessionPersistence,
	setPersistence,
	createUserWithEmailAndPassword,
} from '@firebase/auth';

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

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
			<div className='todo bg-gray-100 h-full '>
				<div className='todo__inner container'>
					{isLoggedIn ? (
						<>
							<div className='authenticated'>
								<TaskWrapper />
							</div>
						</>
					) : (
						<>
							<div className='not-authorized flex items-center '>
								<div className='not-authorized__inner text-black p-6'>
									<h2 className='text-black text-xl'>
										Oops! Not authorized<br></br>for this
										page.
									</h2>
									<p className='text-black text-sm'>
										You should be logged in in order to use{' '}
										the task/to-do app.<br></br> You
										obviously don't want another user to
										edit your tasks, do you?
									</p>
									<div className='flex flex-col md:flex-row not-authorized__buttons'>										<div className='item item--arrow'>
											{isLoggedIn ? (
												<a
													onClick={() =>
														auth.signOut()
													}>
													<span>
														<LogoutSharp />
													</span>
												</a>
											) : (
												<>
													<div
													// text color indigo
														className='cta border-2 border-indigo-600 p-2 text-indigo-600 font-bold flex items-center justify-center'
														onClick={
															handleSignInButtonClick
														}>
														<KeyboardBackspace />
														Sign In
													</div>
												</>
											)}
										</div>
										<div className='item item--arrow'>
											<Link
												href='/'
												className='cta cta-two  border-2 border-indigo-600 p-2 text-indigo-600 font-bold flex items-center justify-center'>
												Or return home
												<KeyboardBackspace />
											</Link>
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
