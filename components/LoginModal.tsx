import { useState, useEffect } from 'react';
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
} from '@/utils/firebase';
import Confetti from 'react-confetti';
import { toast } from 'react-toastify';

type SignInModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	const handleSignInWithGoogle = (): Promise<void> => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider)
			.then((result) => {
				const credential =
					GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				setShowConfetti(true);
				onClose();
				toast.success('You have successfully signed in.');
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	const handleSignInWithEmail = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setShowConfetti(true);
			onClose();
			toast.success('You have successfully signed in.');
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
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
					<Button onClick={onClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={handleSignInWithEmail} color='primary'>
						Sign In
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default SignInModal;
