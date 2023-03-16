import { useState, useEffect } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	AuthErrorCodes,
} from 'firebase/auth';
import { CloseIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
import { FacebookRounded, KeyboardReturn } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Login from '../Login';

interface SignupModalProps {
	onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [userExists, setUserExists] = useState(false);

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
		} catch (error: typeof error) {
			console.error(error);
		}
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	const errorVariants = {
		hidden: {
			opacity: 0,
			y: -50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			y: -50,
			transition: {
				duration: 0.3,
			},
		},
	};

	const successVariants = {
		hidden: {
			opacity: 0,
			y: -50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			y: -50,
			transition: {
				duration: 0.3,
			},
		},
	};
	return (
		<div className='modal'>
			{userExists ? (
				<motion.div
					className='modal__warning-message'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}>
					<p>A user with this email already exists.</p>
				</motion.div>
			) : registered === true ? (
				<motion.div
					className='modal__success-message'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}>
					<h1>Congratulations!</h1>
					<p>You have successfully registered.</p>
				</motion.div>
			) : (
				<div className='modal__inner'>
					<h2 className='modal__title'>Register</h2>
					<motion.div
						className='modal__previous'
						onClick={onClose}
						whileHover={{ scale: 1.05 }}>
						<KeyboardReturn />
					</motion.div>
					<form className='modal__register' onSubmit={handleSignup}>
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
						<div className='modal__checkbox'>
							<input
								type='checkbox'
								checked={rememberMe}
								onChange={handleRememberMeChange}
							/>
							<label htmlFor='rememberMe'>Remember me</label>
						</div>
						<button type='submit'>Register</button>
					</form>
				</div>
			)}
		</div>
	);
}
