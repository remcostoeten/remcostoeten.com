import { useState } from 'react';
import { useRouter } from 'next/router';
import {
	auth,
	signInWithGoogle,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from '@/utils/firebase';
import {
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import Confetti from 'react-confetti';

function LoginModal() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const router = useRouter();

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setPassword(event.target.value);
	};

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle();
			router.push('/');
		} catch (error) {
			setMessage(error.message);
			setOpen(true);
		}
	};

	const handleEmailSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push('/');
			setShowConfetti(true);
		} catch (error) {
			setMessage(error.message);
			setOpen(true);
		}
	};

	const handleCreateAccount = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			router.push('/');
			setShowConfetti(true);
		} catch (error) {
			setMessage(error.message);
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				onClick={handleGoogleSignIn}>
				Sign in with Google
			</Button>
			<TextField
				id='email'
				label='Email'
				variant='outlined'
				value={email}
				onChange={handleEmailChange}
			/>
			<TextField
				id='password'
				label='Password'
				type='password'
				variant='outlined'
				value={password}
				onChange={handlePasswordChange}
			/>
			<Button
				variant='contained'
				color='primary'
				onClick={handleEmailSignIn}>
				Sign in with Email and Password
			</Button>
			<Button
				variant='contained'
				color='primary'
				onClick={handleCreateAccount}>
				Create Account
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				BackdropProps={{ invisible: false }}>
				<DialogTitle>Error</DialogTitle>
				<DialogContent>
					<DialogContentText>{message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						OK
					</Button>
				</DialogActions>
			</Dialog>
			{showConfetti && <Confetti />}
			{showConfetti && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}>
					<h1>Congratulations!</h1>
					<p>You have successfully logged in.</p>
				</div>
			)}
		</div>
	);
}
