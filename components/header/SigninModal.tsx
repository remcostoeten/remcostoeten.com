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
import { motion } from 'framer-motion';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Login from '../Login';
import SignupModal from './SignupModal';
interface SigninModalProps {
	onClose: () => void;
}
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SigninModal({ onClose }: SigninModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [showRegister, setShowRegister] = useState(false);
	const handleOpenSignupModal = () => {
		setShowSignupModal(true);
	};

	const handleCloseSignupModal = () => {
		setShowSignupModal(false);
		setShowModal(false);
	};

	const handleOpenModal = () => {
		setShowModal(true);
		console.log('test');
	};

	const handleCloseModal = () => setShowModal(false);
	useEffect(() => {
		const savedEmail = localStorage.getItem('email');
		const savedPassword = localStorage.getItem('password');
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth();
			const persistenceMode = rememberMe
				? browserLocalPersistence
				: browserSessionPersistence;
			await setPersistence(auth, persistenceMode);
			const result = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);
			console.log(result);
			setRegistered(true);
			console.log(registered); // add this line to check registered state
			localStorage.setItem('email', email);
			localStorage.setItem('password', password);
		} catch (error) {
			console.error(error);
		}
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};
	return (
		<div className='modal'>
			<div>
				{showSignupModal && (
					<SignupModal onClose={handleCloseSignupModal} />
				)}
			</div>

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
							<Login />
						</span>
					</motion.div>
				</div>
				<div className='modal__divider'>or</div>
				{!registered ? (
					<>
						<form
							className='modal__register'
							onSubmit={handleSignin}>
							<motion.div
								className='modal__close'
								onClick={onClose}
								whileHover={{ scale: 1.05 }}>
								<HighlightOffSharpIcon />
							</motion.div>
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
							<a onClick={handleOpenSignupModal} href='#'>
								Sign up
							</a>
						</div>
						{showSignupModal && (
							<SignupModal onClose={handleCloseSignupModal} />
						)}
					</>
				) : (
					<div className='modal__success-message'>
						<p>You have successfully registered!</p>
						<button onClick={() => setRegistered(false)}>OK</button>
					</div>
				)}
			</div>
		</div>
	);
}
