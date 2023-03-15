import { useState } from 'react';
import SignupModal from './SignupModal';

export default function SignupLink() {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<>
			<div className='login-btn' onClick={handleOpenModal}>
				<span>Sign in with Google</span>
			</div>
			{showModal && <SignupModal onClose={handleCloseModal} />}
		</>
	);
}
