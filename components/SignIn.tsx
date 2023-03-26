import { useState } from 'react';
import {
	Button,
	IconButton,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Email, Facebook, Google } from '@mui/icons-material';
import {
	auth,
	signInWithGoogle,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from '@/utils/firebase';
import Confetti from 'react-confetti';
interface SignInProps {
	onSignIn?: () => void;
}

export function SignIn({ onSignIn }: SignInProps) {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<'signin' | 'signup'>('signin');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [error, setError] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleModeChange = (mode: 'signin' | 'signup') => {
		setMode(mode);
		setError('');
		setShowConfetti(false); // reset confetti when mode changes
	};
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(event.target.value);
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(event.target.value);
	const handleDisplayNameChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => setDisplayName(event.target.value);

	const handleSignInWithGoogle = async () => {
		try {
			await signInWithGoogle();
			handleClose();
			onSignIn?.();
		} catch (error) {
			console.error(error);
			setError('Failed to sign in with Google.');
		}
	};

	const handleSignInWithEmailAndPassword = async () => {
		try {
			await signInWithEmailAndPassword(email, password);
			setShowConfetti(true); // show confetti on successful sign in
			handleClose();
			onSignIn?.();
		} catch (error) {
			console.error(error);
			setError('Failed to sign in with email and password.');
		}
	};

	const handleCreateUserWithEmailAndPassword = async () => {
		try {
			await createUserWithEmailAndPassword(
				auth,
				email,
				password,
				displayName,
			);
			setShowConfetti(true); // show confetti on successful account creation
			handleClose();
			onSignIn?.();
		} catch (error) {
			console.error(error);
			setError('Failed to create a new account.');
		}
	};

	return (
		<>
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
				/>
			)}
			<Button
				onClick={handleOpen}
				variant='outlined'
				startIcon={<Email />}>
				{auth.currentUser ? 'Sign Out' : 'Sign In'}
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='auth-modal-title'>
				<Paper
					sx={{ width: 400, maxWidth: '100%', p: 2 }}
					elevation={4}>
					<Typography
						id='auth-modal-title'
						variant='h6'
						align='center'
						gutterBottom>
						{mode === 'signin' ? 'Sign In' : 'Create an Account'}
					</Typography>

					{mode === 'signup' && (
						<TextField
							margin='normal'
							required
							fullWidth
							label='Display Name'
							value={displayName}
							onChange={handleDisplayNameChange}
						/>
					)}

					<TextField
						margin='normal'
						required
						fullWidth
						label='Email Address'
						value={email}
						onChange={handleEmailChange}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Password'
						type='password'
						value={password}
						onChange={handlePasswordChange}
					/>

					{error && <Typography color='error'>{error}</Typography>}

					<Button
						fullWidth
						variant='contained'
						onClick={
							mode === 'signin'
								? handleSignInWithEmailAndPassword
								: handleCreateUserWithEmailAndPassword
						}>
						{mode === 'signin' ? 'Sign In' : 'Create Account'}
					</Button>

					<div
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mt: 2,
						}}>
						<IconButton onClick={handleSignInWithGoogle}>
							<Google />
						</IconButton>
						<IconButton>
							<Facebook />
						</IconButton>
					</div>

					{mode === 'signin' && (
						<Typography
							variant='body2'
							align='center'
							sx={{ mt: 2 }}>
							Don&apos;t have an account?{' '}
							<Button
								color='inherit'
								onClick={() => handleModeChange('signup')}>
								Create one
							</Button>
						</Typography>
					)}

					{mode === 'signup' && (
						<Typography
							variant='body2'
							align='center'
							sx={{ mt: 2 }}>
							Already have an account?{' '}
							<Button
								color='inherit'
								onClick={() => handleModeChange('signin')}>
								Sign in
							</Button>
						</Typography>
					)}
				</Paper>
			</Modal>
		</>
	);
}
export default SignIn;
