import React, { useEffect, useState } from 'react';
import {
	auth,
	signInWithGoogle,
	createUserWithEmailAndPassword,
} from '@/utils/firebase';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { updateProfile } from '@firebase/auth';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';
import SignupModal from './SignupModal';
import SigninModal from './SigninModal';
const SuccessPopup = styled(animated.div)`
	background-color: #4caf50;
	color: white;
	text-align: center;
	padding: 10px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
`;
export default function SignupLink() {
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const router = useRouter();
	const [confetti, setConfetti] = useState(false);

	const successPopupAnimation = useSpring({
		opacity: showSuccess ? 1 : 0,
		transform: showSuccess ? 'translateY(0%)' : 'translateY(-100%)',
		config: { duration: 300 },
	});

	const handleOpenModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	useEffect(() => {
		if (showSuccess) {
			setConfetti(true);
			setTimeout(() => setConfetti(false), 3000);
		}
	}, [showSuccess]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			if (user) {
				await updateProfile(user, { displayName: name });
				setShowSuccess(true);
				setTimeout(() => {
					router.push('/');
				}, 3000);
			}
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	return (
		<>
			{/* {showSuccess && (
				<>
					<SuccessPopup style={successPopupAnimation}>
						Account created successfully! Redirecting to the home
						page...
					</SuccessPopup>
					{confetti && <Confetti />}
				</>
			)} */}
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
