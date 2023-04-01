import { useState } from 'react';
import SigninModal from './SigninModal';

export default function SignupLink() {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<>
			<div className='login-btn' onClick={handleOpenModal}>
				<span>Sign in with Google</span>
			</div>
			{showModal && (
				<>
					<SigninModal onClose={handleCloseModal} />
					<div className='modal-backdrop'></div>
				</>
			)}
		</>
	);
}
