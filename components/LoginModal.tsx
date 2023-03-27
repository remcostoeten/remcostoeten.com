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
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from '@/utils/firebase';
import Confetti from 'react-confetti';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type SignInModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
	const { enqueueSnackbar } = useSnackbar();
	const [name, setName] = useState('');
	const [newUserEmail, setNewUserEmail] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);
	const [newUserName, setNewUserName] = useState('');
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

	const handleSignInWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			if (!auth.currentUser?.displayName === null) {
				toast.success(
					`Welcome back, ${auth.currentUser?.displayName}!`,
				);
			} else {
				toast.success(`Welcome back, ${auth.currentUser?.email}!`);
			}
			setShowConfetti(false);
			onClose();
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
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
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
			toast.error(
				'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
			);
		}
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

			<Dialog open={isOpen} onClose={onClose}>
				<DialogTitle>Sign In</DialogTitle>
				<DialogContent>
					<Button
						onClick={handleSignInWithGoogle}
						startIcon={<Google />}
						fullWidth>
						Sign in with Google
					</Button>
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
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setShowRegisterModal(true)}
						color='primary'>
						Not registered yet?
					</Button>
					<Button onClick={onClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSignInWithEmail} color='primary'>
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
