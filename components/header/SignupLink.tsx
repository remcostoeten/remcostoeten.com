import { useEffect, useState } from 'react';
import SignIn from '../ui-elements/modals/SignIn';

export default function SignupLink() {
	const [showModal, setShowModal] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

	const handleOpenModal = () => setShowModal(true);

	const onCloseSignInModal = () => setShowModal(false);

	const handleSignIn = (email?: string, password?: string) => {
		onCloseSignInModal();
	};

	return (
		<>
			<div className='login-btn' onClick={handleOpenModal}>
				<span>Sign in with Google</span>
			</div>
			{showModal && (
				<>
					<SignIn
						onClose={onCloseSignInModal}
						onSignIn={handleSignIn}
						setShowRegisterModal={function (show: boolean): void {
							throw new Error('Function not implemented.');
						}}
					/>

					<div className='modal-backdrop'></div>
				</>
			)}
		</>
	);
}
