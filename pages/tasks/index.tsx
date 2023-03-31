import React, { useEffect, useState } from 'react';
import TaskWrapper from '@/components/Task/TaskWrapper';
import AsideSmall from '@/components/Task/AsideSmall';
import { KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/Lost';
import Header from '@/components/header/Header';
import { toggleTheme, signIn } from '@/utils/ToggleTheme';
import { auth } from '@/utils/firebase';
import SignInModal from '@/components/LoginModal';

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

	const handleSignInButtonClick = () => {
		setIsSignInModalOpen(true);
	};

	const handleSignInModalClose = () => {
		setIsSignInModalOpen(false);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});

		return unsubscribe;
	}, []);

	return (
		<>
			<div className='dashboard'>
				<>
					<AsideSmall
						view={''}
						isLoggedIn={isLoggedIn} // Pass the isLoggedIn state value here
						setIsLoggedIn={function (value: boolean): void {
							throw new Error('Function not implemented.');
						}}
					/>
					{isLoggedIn ? (
						<div className='authenticated'>
							<div className='dashboard__inner'>
								<TaskWrapper />
							</div>
						</div>
					) : (
						<div className='dashboard__inner'>
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
										You should be logged in in order to use
										the task/to-do app.<br></br> You
										obviously doan't want another user to
										edit your tasks, do you?
									</p>
									<div className='not-authorized__buttons'>
										<div className='item item--arrow'>
											{isLoggedIn ? (
												<a
													onClick={() =>
														auth.signOut()
													}>
													Logout
												</a>
											) : (
												<>
													<div className='item item--arrow'>
														<div
															className='cta cta-two'
															onClick={
																handleSignInButtonClick
															}>
															<span>Sign In</span>
														</div>
													</div>
												</>
											)}
											<SignInModal
												isOpen={isSignInModalOpen}
												onClose={handleSignInModalClose}
											/>
										</div>
										<div className='item item--arrow'>
											<div className='cta cta-two'>
												<Link href='/'>
													Or return home{' '}
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
						</div>
					)}
				</>
			</div>
		</>
	);
}
