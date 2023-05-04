import { useState } from 'react';
import { KeyboardBackspace } from '@mui/icons-material';
import Lost from '../components/ui-elements/authentication/Lost';
import SlideButton from '@/components/ui-elements/SlideButton';
export default function NotAuthenticated() {
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
						app. You obviously do not want another user to edit your
						tasks, do you?
					</p>
					<div className='not-authorized__buttons'>
							{isLoggedIn ? (
								<a onClick={() => auth.signOut()}>
									<span>Logout</span>
								</a>
							) : (
								<SlideButton
									icon={KeyboardBackspace}
									label='Sign In'
								/>
							)}
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
