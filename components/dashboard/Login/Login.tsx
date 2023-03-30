import { SetStateAction, SetStateAction, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { auth } from '@/utils/firebase';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';

interface LoginProps {
	isLoggedIn: boolean;
}

export default function Login({ isLoggedIn }: LoginProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const history = useHistory();

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
			history.push('/dashboard'); // redirect to dashboard page
		} catch (error) {
			console.error('Error logging in:', error);
			// Handle login error
		}
	};

	const handleSignInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const user = result.user;
			setShowConfetti(true);
		});
	};

	return (
		<div className={`login ${isLoggedIn ? 'fadeOut' : 'fadeIn'}`}>
			<div className='loginImage'></div>
			<div className='loginForm'>
				<div className='loginIntro'>
					<h1>Login to your account</h1>
					<p>
						See what's going on in your personal dashboard,
						schedule, logbook and many more features.
					</p>
					<Button
						onClick={handleSignInWithGoogle}
						startIcon={<Google />}
						fullWidth>
						Continue with google
					</Button>
					<div className='loginTagline'>
						<span>Or sign in with Email</span>
					</div>
					<form className='loginForm' onSubmit={handleSubmit}>
						<div className='inputWrapper'>
							<label>email</label>
							<input
								placeholder='e-mail adresss'
								onChange={handleEmailChange}></input>
						</div>
						<div className='inputWrapper'>
							<label>password</label>
							<input
								placeholder='password'
								onChange={handlePasswordChange}></input>
						</div>
						<div className='formActions'>
							<span className='rememberMe'></span>
							<span className='forgotPassword'>
								Forgot password?
							</span>
						</div>
						<button type='submit' className='loginBtn'>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

function signInWithEmailAndPassword(
	auth: Auth,
	email: string,
	password: string,
) {
	throw new Error('Function not implemented.');
}
