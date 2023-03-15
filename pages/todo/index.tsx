import { useState } from 'react';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

function SignUpForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			console.log('User created successfully');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button type='submit'>Sign Up</button>
		</form>
	);
}

export default SignUpForm;
