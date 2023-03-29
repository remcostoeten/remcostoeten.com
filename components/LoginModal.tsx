import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from '@mui/material';
import { Google } from '@mui/icons-material';
import {
	signInWithPopup,
	GoogleAuthProvider,
	auth,
	createUserWithEmailAndPassword,
} from '@/utils/firebase';
import Confetti from 'react-confetti';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SignInModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
	const [name, setName] = useState('');
	const [newUserEmail, setNewUserEmail] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);

	const handleNewUserModalClose = () => {
		setIsNewUserModalOpen(false);
	};

	const handleSignInWithGoogle = (): Promise<void> => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			setShowConfetti(true);
			onClose();
		});
	};

	const handleRegister = async () => {
		console.log('Register button clicked');
		try {
			await createUserWithEmailAndPassword(auth, newUserEmail, password);
			setShowConfetti(true);
			onClose();
			setShowRegisterModal(false);
			if (!auth.currentUser?.displayName === null) {
				toast.success(
					`Welcome aboard ${auth.currentUser?.displayName}!`,
				);
			} else {
				toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
			}
		} catch (error: any) {
			// add type annotation here
			enqueueSnackbar(error.message, { variant: 'error' });
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (showRegisterModal) {
			setNewUserEmail(event.target.value);
		} else {
			setEmail(event.target.value);
		}
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPassword(event.target.value);
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

			<Dialog className='modal' open={isOpen} onClose={onClose}>
				<DialogTitle className='modal__title'>Sign In</DialogTitle>
				<div className='modal__social'>
					<Button
						onClick={handleSignInWithGoogle}
						startIcon={<Google />}
						fullWidth>
						Sign in with Google
					</Button>
				</div>
				<TextField
					margin='normal'
					label='Email'
					variant='outlined'
					fullWidth
					value={email}
					onChange={handleEmailChange}
				/>
				<TextField
					margin='normal'
					label='Password'
					variant='outlined'
					fullWidth
					type='password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<DialogActions>
					<Button
						className='btn btn--link'
						onClick={() => setShowRegisterModal(true)}
						color='primary'>
						Not registered yet?
					</Button>
					<Button className='btn btn--secondary' onClick={onClose}>
						Cancel
					</Button>
					<Button
						className='btn btn--primary'
						onClick={handleRegister}>
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
			<form>
				<Dialog
					open={showRegisterModal}
					onClose={() => setShowRegisterModal(false)}>
					<DialogTitle>Register</DialogTitle>
					<DialogContent>
						<TextField
							margin='normal'
							label='Name'
							variant='outlined'
							fullWidth
							value={name}
							onChange={handleNameChange}
						/>
						<TextField
							margin='normal'
							label='Email'
							variant='outlined'
							fullWidth
							value={newUserEmail}
							onChange={handleEmailChange}
						/>
						<TextField
							margin='normal'
							label='Password'
							variant='outlined'
							fullWidth
							type='password'
							value={password}
							onChange={handlePasswordChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setShowRegisterModal(false)}
							color='secondary'>
							Cancel
						</Button>
						<Button onClick={handleRegister} color='primary'>
							Register
						</Button>
					</DialogActions>
				</Dialog>
			</form>
		</>
	);
};

export default SignInModal;
