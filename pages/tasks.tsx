import TaskWrapper from '@/components/task/TaskWrapper';
import React, { useEffect, useState } from 'react';
import AsideSmall from '@/components/task/AsideSmall';
import { KeyboardBackspace, LogoutSharp } from '@mui/icons-material';
import Lost from '@/components/task/Lost';
import { ToastContainer, toast } from 'react-toastify';
import SlideButton from '@/components/ui-elements/buttons/RetroButton';
import SignInModal from '@/components/ui-elements/SignInModal';
import SignUpModal from '@/components/ui-elements/SignUpModal';
import { Modal } from '@mui/material';
import { db, auth, signInWithGoogle, logout } from 'utils/firebase';
import Confetti from 'react-confetti';

export default function Index() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

	const handleSignInClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSignUpClick = () => {
		setShowModal(false);
		setShowSignUpModal(true);
	};

	const handleCloseSignUpModal = () => {
		setShowSignUpModal(false);
	};

	const handleSignIn = () => {
		setIsLoggedIn(true);
	  };


	return (
		<>
			<div className='todo'>
				<div className='todo__inner flex'>
					<AsideSmall view={''} isLoggedIn={false} />
					{isLoggedIn ? (
          <div className='authenticated'>
            <TaskWrapper />
          </div>
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
										obviously don `&apos;`t want another
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
					)}
				</div>
			</div>
			<SignInModal
  open={showModal}
  handleClose={handleCloseModal}
  signInWithGoogle={signInWithGoogle}
  handleSignUpClick={handleSignUpClick}
  onSignIn={() => setIsLoggedIn(true)}
/>



			
			<SignUpModal open={showSignUpModal} handleClose={handleCloseSignUpModal} />
			<ToastContainer />
			{showConfetti && <Confetti />}
		</>
	);
	
}
