import { useState } from 'react';
import SignupModal from './SignupModal';

export default function SignupLink() {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	return (
		<>
			<a href='#' onClick={handleOpenModal}>
				Sign up
			</a>
			{showModal && <SignupModal onClose={handleCloseModal} />}
		</>
	);
}
