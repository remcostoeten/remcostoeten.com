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

interface SignupModalProps {
	onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [registered, setRegistered] = useState(false);

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
		} catch (error) {
			console.error(error);
		}
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	return (
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
				<div className='modal__divider'></div>
				{!registered ? (
					<form className='modal__register' onSubmit={handleSignup}>
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
							<input
								type='checkbox'
								id='rememberMe'
								checked={rememberMe}
								onChange={handleRememberMeChange}
							/>
							<label htmlFor='rememberMe'>Remember Me</label>
						</div>
						<button className='login-btn' type='submit'>
							<span>Sign up</span>
						</button>
					</form>
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
	);
}
