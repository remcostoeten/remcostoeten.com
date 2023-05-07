import { useState, useEffect } from 'react';
import {
	getAuth,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Register from './Register';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Confetti from 'react-confetti';

interface SigninModalProps {
	onClose: () => void;
	onSignIn: (email?: string, password?: string, rememberMe?: boolean) => void;
	setShowRegisterModal: (show: boolean) => void;
}

export default function SignIn({ onClose, onSignIn }: SigninModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);

	const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth();
			const persistenceMode = rememberMe
				? browserLocalPersistence
				: browserSessionPersistence;
			await setPersistence(auth, persistenceMode);
			await signInWithEmailAndPassword(auth, email, password); // Change this

			onSignIn(email, password, rememberMe);
			setShowConfetti(true);

			if (auth.currentUser?.displayName) {
				toast.success(
					`Welcome aboard ${auth.currentUser.displayName}!`,
				);
				setShowConfetti(true);
			} else {
				toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
				setShowConfetti(true);
			}
		} catch (error) {
			console.error(error);
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
	};

	useEffect(() => {
		if (showConfetti) {
			const timer = setTimeout(() => {
				setShowConfetti(false);
				onClose();
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [showConfetti, onClose]);

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const handleCloseSignupModal = () => {
		setShowSignupModal(false);
	};

	return (
		<>
			<div className='modal'>
				<div className='modal__inner'>
					<h2 className='modal__title'>Login</h2>
					<div className='modal__social'>
						<motion.div
							className='header__user'
							whileHover={{ scale: 1.05 }}>
							<span className='google'>
								<Login />
							</span>
						</motion.div>
					</div>
					<div className='modal__divider'>or</div>
					<form className='modal__register' onSubmit={handleSignin}>
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
								<label htmlFor='rememberMe'>Remember Me</label>
							</span>
							<span>
								<a href='#'>Forgot Password?</a>
							</span>
						</div>
						<button className='login-btn' type='submit'>
							<span>Sign in</span>
						</button>
					</form>
					<div className='modal__new-user'>
						<p>Not registered yet?</p>{' '}
						<a href='#' onClick={() => setShowSignupModal(true)}>
							Sign up
						</a>
					</div>
					{showSignupModal && (
						<Register
							onClose={handleCloseSignupModal}
							onSignIn={onSignIn}
							setShowRegisterModal={setShowSignupModal}
						/>
					)}
				</div>
			</div>
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					numberOfPieces={200}
				/>
			)}{' '}
		</>
	);
}
