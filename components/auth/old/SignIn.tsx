import { useState, useEffect } from 'react';
import {
	getAuth,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Register from './Register';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Confetti from 'react-confetti';

interface SignInModalProps {
	onClose: () => void;
	onSignIn: (email?: string, password?: string, rememberMe?: boolean) => void;
	setShowRegisterModal: (show: boolean) => void;
}

export default function SignIn({
	onClose,
	onSignIn,
	setShowRegisterModal,
}: SignInModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
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
			await signInWithEmailAndPassword(auth, email, password);

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
			<div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
				<div className='bg-white rounded shadow-lg p-8 w-full max-w-md'>
					<h2 className='text-2xl font-semibold mb-6'>Login</h2>
					<div className='flex justify-center mb-6'>
						<span className='text-gray-500'>
							<Login />
						</span>
					</div>
					<div className='border-b border-gray-200 mb-6'></div>
					<form onSubmit={handleSignin}>
						<div className='relative mb-4'>
							<HighlightOffSharpIcon
								className='absolute top-0 right-0 cursor-pointer'
								onClick={onClose}
							/>
						</div>
						<div className='mb-4'>
							<input
								type='email'
								placeholder='Email address'
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								className='w-full p-2 border border-gray-300 rounded'
							/>
						</div>
						<div className='mb-4'>
							<input
								type='password'
								value={password}
								placeholder='Password'
								onChange={(event) =>
									setPassword(event.target.value)
								}
								className='w-full p-2 border border-gray-300 rounded'
							/>
						</div>
						<div className='flex justify-between items-center mb-4'>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='rememberMe'
									checked={rememberMe}
									onChange={handleRememberMeChange}
									className='mr-2'
								/>
								<label htmlFor='rememberMe'>Remember Me</label>
							</div>
							<a href='#' className='text-sm text-blue-500'>
								Forgot Password?
							</a>
						</div>
						<button
							className='w-full py-2 bg-blue-500 text-white font-semibold rounded'
							type='submit'>
							Sign in
						</button>
					</form>
					<div className='flex justify-center mt-4'>
						<p className='mr-2'>Not registered yet?</p>
						<a
							href='#'
							onClick={() => setShowSignupModal(true)}
							className='text-blue-500'>
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
			)}
		</>
	);
}
