import React, { useEffect, useState } from 'react';
import {
	auth,
	signInWithGoogle,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@/utils/firebase';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { updateProfile } from '@firebase/auth';
import Confetti from 'react-confetti';
import { useSpring, animated } from 'react-spring';
import { FacebookRounded, Login, Google } from '@mui/icons-material';
import { motion } from 'framer-motion';
import GoogleLogin from './GoogleLogin';

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

const LoginForm: React.FC<{ closeModal: () => void }> = ({
	closeModal,
}: {
	closeModal: () => void;
}) => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const router = useRouter();
	const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const successPopupAnimation = useSpring({
		opacity: showSuccess ? 1 : 0,
		transform: showSuccess ? 'translateY(0%)' : 'translateY(-100%)',
		config: { duration: 300 },
	});

	const [confetti, setConfetti] = useState(false);

	useEffect(() => {
		if (showSuccess) {
			setConfetti(true);
			setTimeout(() => setConfetti(false), 3000);
		}
	}, [showSuccess]);

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			if (user) {
				setShowSuccess(true);
				setTimeout(() => {
					closeModal(); // Close the modal
					router.push('/'); // Redirect to the home page
				}, 3000);
			}
		} catch (error) {
			console.error('Error logging in:', error);
			setError(error.message); // Set the error state to display the error message
		}
	};
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
			{showSuccess && (
				<>
					<SuccessPopup style={successPopupAnimation}>
						Account created successfully! Redirecting to the home
						page...
					</SuccessPopup>
					{confetti && <Confetti />}
				</>
			)}
			{error && (
				<div
					style={{
						color: 'red',
						textAlign: 'center',
						marginBottom: '10px',
					}}>
					{error}
				</div>
			)}
			{showLoginForm ? (
				<>
					<div className='modal'>
						<div className='modal__inner'>
							<h2 className='modal__title'>Login</h2>
							<div className='modal__social'>
								<motion.div
									className='header__user'
									whileHover={{ scale: 1.05 }}>
									<span className='facebook'></span>
									<FacebookRounded />
								</motion.div>

								<motion.div
									className='header__user'
									whileHover={{ scale: 1.05 }}>
									<span className='google'>
										<GoogleLogin />
									</span>
								</motion.div>
							</div>
							<div className='modal__divider'>or</div>
							<div className='modal__login'>
								<form
									className='modal__register'
									onSubmit={handleLogin}>
									<div className='modal__input'>
										<label>
											Email:
											<input
												type='email'
												value={email}
												onChange={(e: {
													target: { value: any };
												}) => setEmail(e.target.value)}
												required
											/>
										</label>
									</div>
									<div className='modal__input'>
										<label>
											Password:
											<input
												type='password'
												value={password}
												onChange={(e: {
													target: { value: any };
												}) =>
													setPassword(e.target.value)
												}
												required
											/>
										</label>
									</div>
									<div className='modal__buttons'>
										<button
											className='btn btn--primary'
											type='submit'>
											Sign in
										</button>
									</div>
									<div
										className='btn btn--link'
										type='button'
										onClick={() => setShowLoginForm(false)}>
										{' '}
										Don't have an account? Sign up
									</div>
								</form>
							</div>
						</div>
					</div>
				</>
			) : (
				<form onSubmit={handleSubmit}>
					<label>
						Name:
						<input
							type='text'
							value={name}
							onChange={(e: { target: { value: any } }) =>
								setName(e.target.value)
							}
							required
						/>
					</label>
					<br />
					<label>
						Email:
						<input
							type='email'
							value={email}
							onChange={(e: { target: { value: any } }) =>
								setEmail(e.target.value)
							}
							required
						/>
					</label>
					<br />
					<label>
						Password:
						<input
							type='password'
							value={password}
							onChange={(e: { target: { value: any } }) =>
								setPassword(e.target.value)
							}
							required
						/>
					</label>
					<br />
					<button type='submit'>Sign up</button>
					<br />
					<button type='button' onClick={signInWithGoogle}>
						Sign in with Google
					</button>
					<br />
					<button
						type='button'
						onClick={() => setShowLoginForm(true)}>
						Already have an account? Sign in
					</button>
				</form>
			)}
		</>
	);
};

export default LoginForm;
