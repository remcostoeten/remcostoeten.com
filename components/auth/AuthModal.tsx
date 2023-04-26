import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';
interface LoginModalProps {
	onShowRegister: () => void;
	onClose: () => void;
	handleGoogleSignIn: () => void;
}

const AuthModal: React.FC<LoginModalProps> = ({
	onShowRegister,
	onClose,
	handleGoogleSignIn,
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await signInWithEmailAndPassword(auth, email, password);
			onClose();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div>
			<h3
				className='text-lg leading-6 font-medium text-gray-900'
				id='modal-headline'>
				Sign in to your account
			</h3>
			<div className='mt-2'>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						/>
					</div>
					{error && (
						<div className='mb-4 text-sm text-red-500'>
							<p>{error}</p>
						</div>
					)}
					<div className='flex items-center justify-between'>
						<button
							type='submit'
							className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
							Sign in
						</button>
					</div>
				</form>
			</div>
			<div className='mt-3 text-sm'>
				<button
					type='button'
					className='text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline'
					onClick={handleGoogleSignIn}>
					Sign in with Google
				</button>
			</div>
			<div className='mt-3 text-sm'>
				<button
					type='button'
					className='text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline'
					onClick={onShowRegister}>
					Don't have an account? Register
				</button>
			</div>
		</div>
	);
};

export default AuthModal;
