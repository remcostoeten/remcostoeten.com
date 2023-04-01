import TaskWrapper from '@/components/Task/TaskWrapper';
import React, { useEffect, useState } from 'react';
import AsideSmall from '@/components/Task/AsideSmall';
import {
	KeyboardBackspace,
	LoginSharp,
	LogoutSharp,
} from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/Lost';
import { auth, GoogleAuthProvider, signInWithPopup } from '@/utils/firebase';
import Confetti from 'react-confetti';
import SigninModal from '@/components/header/SigninModal';
import { ToastContainer, toast } from 'react-toastify';

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	interface SigninModalProps {
		onClose: () => void;
		onSignIn: (email?: string, password?: string) => void;
	}

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

	const signInUser = async (email?: string, password?: string) => {
		try {
			let result;
			if (email && password) {
				result = await auth.signInWithEmailAndPassword(email, password); // Use signInWithEmailAndPassword
			} else {
				result = await signInWithPopup(auth, new GoogleAuthProvider());
				setIsLoggedIn(true);
				setShowConfetti(true);
			}
			setIsLoggedIn(true);
			setShowConfetti(true);
			if (auth.currentUser && auth.currentUser.displayName !== null) {
				toast.success(
					`Welcome aboard ${auth.currentUser.displayName}!`,
				);
			}
		} catch (error) {
			console.log(error);
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
				<div className='todo__inner'>
					<AsideSmall
						view={''}
						isLoggedIn={false}
						setIsLoggedIn={function (value: boolean): void {
							throw new Error('Function not implemented.');
						}}
					/>
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
														className='cta'
														onClick={
															handleSignInButtonClick
														}>
														Sign In
													</div>
												</>
											)}
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
			{isSignInModalOpen && (
				<SigninModal
					onClose={handleSignInModalClose}
					onSignIn={signInUser}
				/>
			)}
			<ToastContainer />
			{showConfetti && <Confetti />}
		</>
	);
}
