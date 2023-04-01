import TaskWrapper from '@/components/Task/TaskWrapper';
import React, { useState } from 'react';
import AsideSmall from '@/components/Task/AsideSmall';
import { KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/Lost';
import { auth, GoogleAuthProvider, signInWithPopup } from '@/utils/firebase';

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const toggleTheme = () => {
		if (document.body.classList.contains('theme-white')) {
			document.body.classList.remove('theme-white');
			document.body.classList.add('theme-dark');
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-white');
		}
	};

	const signIn = async (email?: string, password?: string) => {
		try {
			let result;
			if (email && password) {
				result = await signIn(email, password);
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
											<div
												className='cta'
												onClick={() =>
													signIn(email, password)
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
