import React from 'react';
import Lost from '@/components/task/Lost';
import SlideButton from '@/components/ui-elements/buttons/RetroButton';

export default function notAuthorizedTask() {
	return (
		<>
			<div className='not-authorized'>
				<div className='not-authorized__inner'>
					<h2>
						Oops! Not authorized<br></br>for this page.
					</h2>
					<p>
						You should be logged in in order to use the task/to-do
						app.<br></br> You obviously don `&apos;`t want another
						user to edit your tasks, do you?
					</p>
					<div className='not-authorized__buttons'>
						<SlideButton
							label='Sign In'
							onClick={handleSignInClick}
							textColor='text-indigo-600'
							borderColor='border-2 border-indigo-600'
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
	);
}
