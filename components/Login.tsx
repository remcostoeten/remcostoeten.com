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
				<button onClick={signIn}>Sign in with Google</button>
			)}
			{isLoggedIn && <button onClick={signOut}>Sign out</button>}
		</div>
	);
};

export default Login;
