import { SetStateAction, useState } from 'react';
import { auth } from '@/utils/firebase';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import message from 'react-intl/src/components/message';
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
interface MyComponentProps {
	width: number;
}

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);

	const handleEmailChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error('Error logging in:', error);
			// Handle login error
		}
	};

	const handleSignInWithGoogle = (): Promise<void> => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			setShowConfetti(true);
		});
	};

	return (
		<>
			<div className='login-container'></div>
			<div className='login'>
				<div className='login__image'></div>
				<div className='login__login'>
					<div className='login__intro'>
						<div className='top'>
							<h1>Login to your account</h1>
							<p>
								See what's going on in your personal dashboard,
								schedule, logbook and many more features.
							</p>
						</div>
						<div className='bottom'>
							<Button
								onClick={handleSignInWithGoogle}
								startIcon={<Google />}
								fullWidth>
								Continue with google
							</Button>
						</div>
						<div className='login__tagline'>
							<span>Or sign in with Email</span>
						</div>
					</div>
				</div>
			</div>
		</>
		// <div className={styles.container}>
		// 	<h1 className={styles.title}>Login</h1>
		// 	<form onSubmit={handleSubmit}>
		// 		<label htmlFor='email'>Email:</label>
		// 		<input
		// 			type='email'
		// 			id='email'
		// 			value={email}
		// 			onChange={handleEmailChange}
		// 		/>

		// 		<label htmlFor='password'>Password:</label>
		// 		<input
		// 			type='password'
		// 			id='password'
		// 			value={password}
		// 			onChange={handlePasswordChange}
		// 		/>

		// 		<button type='submit'>Login</button>
		// 	</form>
		// </div>
	);
}
function signInWithEmailAndPassword(
	auth: Auth,
	email: string,
	password: string,
) {
	throw new Error('Function not implemented.');
}
