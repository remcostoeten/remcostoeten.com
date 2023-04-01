import { useState, useEffect } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
} from 'firebase/auth';

import { CloseIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FacebookRounded, Google } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';

interface SigninModalProps {
	onClose: () => void;
	onSignIn: (email?: string, password?: string) => void;
}

export default function SigninModal({ onClose, onSignIn }: SigninModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		const savedEmail = localStorage.getItem('email');
		const savedPassword = localStorage.getItem('password');
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth();
			const persistenceMode = rememberMe
				? browserLocalPersistence
				: browserSessionPersistence;
			await setPersistence(auth, persistenceMode);
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			console.log(result);
			setRegistered(true);
			localStorage.setItem('email', email);
			localStorage.setItem('password', password);
			if (!auth.currentUser?.displayName === null) {
				toast.success(
					`Welcome aboard ${auth.currentUser?.displayName}!`,
				);
			} else {
				toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
			}
		} catch (error) {
			console.error(error);
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	useEffect(() => {
		if (showConfetti) {
			setTimeout(() => {
				setFadeOut(true);
			}, 3000);
		}
	}, [showConfetti]);

	return (
		<>
			<ToastContainer />
			{showConfetti && (
				<div
					style={{
						top: -100,
						opacity: fadeOut ? 0 : 1,
						transition: 'opacity 1s ease-out',
					}}>
					<Confetti />
				</div>
			)}

			<div className='modal'>
				<div className='modal__inner'>
					<h2 className='modal__title'>Login</h2>
					<div className='modal__social'>
						<span className='facebook'>
							<FacebookRounded />
						</span>
						<span className='google'>
							<Google />
						</span>
					</div>
					<div className='modal__divider'>or</div>
					{!registered ? (
						<>
							<form
								className='modal__register'
								onSubmit={handleSignup}>
								<div className='modal__input'>
									<EmailIcon />
									<input
										type='email'
										placeholder='email address'
										value={email}
										onChange={(event) =>
											setEmail(event.target.value)
										}
									/>
								</div>
								<div className='modal__input'>
									<LockIcon />
									<input
										type='password'
										value={password}
										placeholder='password'
										onChange={(event) =>
											setPassword(event.target.value)
										}
									/>
								</div>
								<div className='modal__remember-me'>
									<span>
										<input
											type='checkbox'
											id='rememberMe'
											checked={rememberMe}
											onChange={handleRememberMeChange}
										/>
										<label htmlFor='rememberMe'>
											Remember Me
										</label>
									</span>
									<span>
										<a href='#'>Forgot Password?</a>
									</span>
								</div>
								<button className='login-btn' type='submit'>
									<span>Sign up</span>
								</button>
							</form>
							<div className='modal__new-user'>
								<p>Not registered yet?</p>{' '}
								<a href='#'>Sign up</a>
							</div>
						</>
					) : (
						<div className='modal__success-message'>
							<p>You have successfully registered!</p>
						</div>
					)}
					<div className='modal__close' onClick={onClose}>
						Close
						<CloseIcon />
					</div>
				</div>
			</div>
		</>
	);
}
