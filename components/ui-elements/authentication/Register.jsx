import { useState, useEffect } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	updateProfile,
} from 'firebase/auth';

import { CloseIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { auth } from '@/utils/firebase';

export default function Register({ onClose, onSignIn, setShowRegisterModal }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [name, setName] = useState('');

	useEffect(() => {
		const savedEmail = localStorage.getItem('email');
		const savedPassword = localStorage.getItem('password');
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	useEffect(() => {
		const user = auth.currentUser;
		if (user && name) {
			updateProfile(user, { displayName: name })
				.then(() => {
					if (!user.displayName) {
						toast.success(`Welcome aboard ${user.email}!`);
					} else {
						toast.success(`Welcome aboard ${user.displayName}!`);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [name]);

	useEffect(() => {
		if (showConfetti) {
			const timer = setTimeout(() => {
				setShowConfetti(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [showConfetti]);

	const handleSignup = async (event) => {
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
			setShowConfetti(true);
			localStorage.setItem('email', email);
			localStorage.setItem('password', password);
			document.body.classList.remove('register-open');

			if (auth.currentUser) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				if (auth.currentUser.displayName) {
					toast.success(
						`Welcome aboard ${auth.currentUser.displayName}!`,
					);
				} else {
					toast.success(`Welcome aboard ${auth.currentUser.email}!`);
				}
			}
		} catch (error) {
			console.error(error);
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
	};

	const handleSignInClick = (event) => {
		event.preventDefault();
		onSignIn(email, password);
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
	});

	return (
		<>
			<div className='modal'>
				<div>
					{registered && (
						<div className='confetti-container'>
							<Confetti
								width={800}
								height={600}
								numberOfPieces={200}
								recycle={fadeOut}
							/>
						</div>
					)}
				</div>
				<div className='modal__inner'>
					<h2 className='modal__title'>Register</h2>
					<form className='modal__register' onSubmit={handleSignup}>
						<motion.div
							className='modal__close'
							onClick={onClose}
							whileHover={{ scale: 1.05 }}>
							<CloseIcon />
						</motion.div>
						<div className='modal__input'>
							<Person />
							<input
								type='text'
								placeholder='name'
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
							/>
						</div>
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
								placeholder='password'
								value={password}
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
								<label htmlFor='rememberMe'>Remember Me</label>
							</span>
						</div>
						<button className='login-btn' type='submit'>
							<span>Register</span>
						</button>
					</form>
					<div className='modal__new-user'>
						<p>Already registered?</p>{' '}
						<a href='#' onClick={handleSignInClick}>
							Sign in
						</a>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}
