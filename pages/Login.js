import React, { useRef } from 'react';
import { auth } from '../firebase';

function Login() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const register = (e) => {
		e.preventDefault();

		auth.createUserWithEmailAndPassword(
			emailRef.current.value,
			passwordRef.current.value,
		)

			.then((authUser) => {
				console.log(authUser);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const signIn = (e) => {
		e.preventDefault();
	};

	return (
		<div className='login'>
			<form>
				<h1>Login</h1>
				<input ref='emailRef' placeholder='Email' type='email' />
				<input
					ref='passwordlRef'
					placeholder='Password'
					type='password'
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}

export default Login;
