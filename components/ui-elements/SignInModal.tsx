import {
	getAuth,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	signInWithEmailAndPassword,
  } from 'firebase/auth';
  import { CloseIcon, EmailIcon, LockIcon } from '@chakra-ui/icons';
  import { FacebookRounded, Google } from '@mui/icons-material';
  import { motion } from 'framer-motion';
  import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
  import SignUpModal from './SignUpModal';
  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Login from '@/components/Login';
  import Confetti from 'react-confetti';
  import { useState } from 'react';
  
  interface SignInModalProps {
	open: boolean;
	handleClose: () => void;
	signInWithGoogle: () => Promise<void>;
	handleSignUpClick: () => void;
	onSignIn: () => void;
  }
  
  export default function SignInModal({
	open,
	handleClose,
	signInWithGoogle,
	handleSignUpClick,
	onSignIn,
  }: SignInModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
  
	const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
	  event.preventDefault();
	  try {
		const auth = getAuth();
		const persistenceMode = rememberMe
		  ? browserLocalPersistence
		  : browserSessionPersistence;
		await setPersistence(auth, persistenceMode);
		await signInWithEmailAndPassword(auth, email, password);
  
		onSignIn();
		setShowConfetti(true);
  
		if (auth.currentUser?.displayName) {
		  toast.success(`Welcome aboard ${auth.currentUser.displayName}!`);
		} else {
		  toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
		}
	  } catch (error) {
		console.error(error);
		toast.error(
		  'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.'
		);
	  }
	};
  
	const handleRememberMeChange = () => {
	  setRememberMe(!rememberMe);
	};
  
	const handleCloseSignupModal = () => {
	  handleClose();
	  handleSignUpClick();
	};
  

	return (
		<>
			<div className='modal'>
				<div className='modal__inner'>
					<h2 className='modal__title'>Login</h2>
					<div className='modal__social'>
							<span className='google'>
								<Login />
							</span>
					</div>
					<div className='modal__divider'>or</div>
					<form className='modal__register' onSubmit={handleSignIn}>
							{/* <motion.div
								className='modal__close'
								onClick={handleClose}
								whileHover={{ scale: 1.05 }}>
								<HighlightOffSharpIcon /> */}
						{/* </motion.div> */}
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
					{/* {showSignupModal && (
						<Register
							handleClose={handleCloseSignupModal}
							onSignIn={onSignIn}
							setShowRegisterModal={setShowSignupModal}
						/>
					)} */}
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