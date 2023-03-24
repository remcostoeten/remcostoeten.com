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

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
												onClick={signIn}
												className='cta'>
												<KeyboardBackspace />
												Login
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
