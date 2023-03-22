import TaskWrapper from '@/components/Task/TaskWrapper';
import React from 'react';
import { signIn, signOut } from '@/utils/LoginLogic';
import AsideSmall from '@/components/Task/AsideSmall';
import AsideBig from '@/components/Task/AsideBig';
import { CheckCircle, KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function index({ isLoggedIn }: { isLoggedIn: boolean }) {
	return (
		<>
			<div className='todo'>
				<div className='todo__inner'>
					<AsideSmall isLoggedIn={isLoggedIn} view='someView' />
					{isLoggedIn ? (
						<>
							<TaskWrapper />
						</>
					) : (
						<>
							<div className='not-authorized'>
								<div className='not-authorized__inner'>
									<h2>Oops! Not authorized for this page.</h2>
									<p>
										You should be logged in in order to use
										the task/to-do app. You obviously don't
										want another user to edit your tasks, do
										you?
									</p>
									<ul>
										<li>
											<CheckCircle />
											Save your tasks and access them from
											any device
										</li>
										<li>
											<CheckCircle />
											Set reminders for important tasks
											and receive notifications*
										</li>
										<li>
											<CheckCircle />
											Categorize your tasks by project,
											deadline, priority, or tag
										</li>
										<li>
											<CheckCircle />
											Collaborate with others on shared
											tasks or projects*
										</li>
									</ul>
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
									<p>
										Don't miss out on the benefits of using
										our app. Please log in to start
										organizing your tasks today!
									</p>
								</div>
							</div>
							<div className='todo__illustration'></div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
