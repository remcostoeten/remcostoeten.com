import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

interface SignupModalProps {
	onClose: () => void;
}

export default function SignupModal({ onClose }: SignupModalProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const auth = getAuth(); // create the auth object here
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			console.log(result);
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2>Sign up</h2>
				<form onSubmit={handleSignup}>
					<label>
						Email:
						<input
							type='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</label>
					<label>
						Password:
						<input
							type='password'
							value={password}
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>
					</label>
					<button type='submit'>Sign up</button>
				</form>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
}
