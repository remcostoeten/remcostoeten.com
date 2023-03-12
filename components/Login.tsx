import { useState } from 'react';
import { auth, signInWithPopup, GoogleAuthProvider } from '../firebase';

const Login = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const signIn = async () => {
		try {
			const result = await signInWithPopup(
				auth,
				new GoogleAuthProvider(),
			);
			setIsLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	const signOut = async () => {
		try {
			await auth.signOut();
			setIsLoggedIn(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{isLoggedIn ? (
				<div>You have successfully logged in!</div>
			) : (
				<div className='login-btn' onClick={signIn}>
					<span>Sign in with Google</span>
				</div>
			)}
			{isLoggedIn && <button onClick={signOut}>Sign out</button>}
		</div>
	);
};

export default Login;
