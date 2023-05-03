import { useState } from 'react';
import { KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '../components/ui-elements/authentication/Lost';
import slideButton from '../components/ui-elements/slideButton';
export default function notAuthenticated() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<>
			<div className='not-authorized container'>
				<div className='not-authorized__inner'>
					<h2>
						Oops! Not authorized<br></br>for this page.
					</h2>
					<p className='text-xs'>
						You should be logged in in order to use the task/to-do
						app. You obviously don't want another user to edit your
						tasks, do you?
					</p>
					<div className='not-authorized__buttons'>
						<div className='item item--arrow'>
							{isLoggedIn ? (
								<a onClick={() => auth.signOut()}>
									<span>
										<LogoutSharp />
									</span>
								</a>
							) : (
								<>
									<slideButton
										onClick={() => setIsLoggedIn(true)}
										text='Sign Up'
										icon={<KeyboardBackspace />}
									/>
									<div className='cta'>
										<KeyboardBackspace />
										Sign In
									</div>
								</>
							)}
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
	);
}
