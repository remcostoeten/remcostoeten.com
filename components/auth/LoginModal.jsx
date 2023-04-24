import React, { useState } from 'react';
import Modal from '@/components/ui-elements/Modal';
import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	Auth,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';

const LoginModal = ({ isOpen, onClose }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider);
	};

	const handleSignInWithGithub = () => {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider);
	};

	const handleSignUp = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			const user = userCredential.user;
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className='modal-content'>
				<div className='modal-header'>
					<h5 className='modal-title'>Log in</h5>
					<button
						type='button'
						className='close'
						onClick={onClose}
						aria-label='Close'>
						<span aria-hidden='true'>&times;</span>
					</button>
				</div>
				<div className='modal-body'>
					<div className='form-group'>
						<button
							className='btn btn-primary btn-block'
							onClick={handleSignInWithGoogle}>
							<i className='fab fa-google mr-2'></i> Sign in with
							Google
						</button>
					</div>
					<div className='form-group'>
						<button
							className='btn btn-secondary btn-block'
							onClick={handleSignInWithGithub}>
							<i className='fab fa-github mr-2'></i> Sign in with
							GitHub
						</button>
					</div>
					<div className='form-group'>
						<hr />
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							className='form-control'
							id='email'
							aria-describedby='emailHelp'
							placeholder='Enter email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type='submit'
						className='btn btn-primary btn-block'
						onClick={handleSignUp}>
						Sign up
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default LoginModal;
