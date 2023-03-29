import TaskWrapper from '@/components/Task/TaskWrapper';
import React from 'react';
import AsideSmall from '@/components/Task/AsideSmall';
import { KeyboardBackspace } from '@mui/icons-material';
import Link from 'next/link';
import Lost from '@/components/Lost';
import Header from '@/components/header/Header';

interface AsideSmallProps {
	isLoggedIn: boolean;
	view?: string;
}

export default function Index() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const toggleTheme = () => {
		if (document.body.classList.contains('theme-white')) {
			document.body.classList.remove('theme-white');
			document.body.classList.add('theme-dark');
		} else {
			document.body.classList.remove('theme-dark');
			document.body.classList.add('theme-white');
		}
	};

	return (
		<>
			<Header />
			<div className='todo'>
				<div className='todo__inner'>
					<AsideSmall view={''} />
					<div className='not-authorized'>
						<button className='toggleTheme' onClick={toggleTheme}>
							Toggle dark/light mode
						</button>
						<div className='not-authorized__inner'>
							<h2>
								Oops! Not authorized<br></br>for this page.
							</h2>
							<p>
								You should be logged in in order to use the
								task/to-do app.<br></br> You obviously don't
								want another user to edit your tasks, do you?
							</p>
							<div className='not-authorized__buttons'>
								<div className='item item--arrow'>
									<div
										className='cta'
										// onClick={handleSignInClick}>
									>
										Sign In
									</div>
								</div>
								<div className='item item--arrow'>
									<div className='cta cta-two'>
										<Link href='/'>Or return home </Link>
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

					<div className='authenticated'>
						<TaskWrapper />
					</div>
				</div>
			</div>
		</>
	);
}
