import { useEffect, useState } from 'react';
import Modal from '../ui-elements/Modal';
import {
	getAuth,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import Dog from '/public/dog.png';

export default function SignInPuppy({ isOpen, onClose }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [username, setUserName] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [registered, setRegistered] = useState(false);
	const [formWarning, setFormWarning] = useState(false);
	const [formValid, setFormValid] = useState(false);
	const [isValidated, setIsValidated] = useState(false);

	useEffect(() => {
		const user = auth.currentUser;
		if (user && name) {
			updateProfile(user, { displayName: name })
				.then(() => {
					if (!user.displayName) {
						toast.success(`Welcome aboard ${user.email}!`);
					} else {
						toast.success(`Welcome aboard ${user.displayName}!`);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [name]);

	const handleSignUp = async (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;
		const isFormValid = validateForm(email, password);
		const validationSuccess = setIsValidated(validationSuccess); // result of validation process;

		setFormValid(isFormValid);
		if (isFormValid) {
			try {
				const auth = getAuth();
				const persistenceMode = rememberMe
					? browserLocalPersistence
					: browserSessionPersistence;
				await setPersistence(auth, persistenceMode);
				await signInWithEmailAndPassword(auth, email, password);

				onSignIn(email, password, rememberMe);

				if (auth.currentUser?.displayName) {
					toast.success(
						`Welcome aboard ${auth.currentUser.displayName}!`,
					);
				} else {
					toast.success(`Welcome aboard ${auth.currentUser?.email}!`);
				}
				setFormWarning(false);
			} catch (error) {
				setFormWarning(true);
				console.error(error);
				toast.error(
					'Something went wrong, probably a typo or already got an account? If this keeps happening contact the admin.',
				);
			}
		} else {
			toast.error(
				'Invalid email or password. Please check your input and try again.',
			);
		}
	};
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

	const validateForm = (email, password) => {
		const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		const isEmailValid = emailRegex.test(email);
		return isEmailValid && isPasswordValid;
	};

	return (
		<Modal className={`container mx-auto ${formWarning ? 'warning' : ''}`}>
			<div className='flex justify-center px-6 my-12'>
				{/* Row */}
				<div className='w-full xl:w-3/4 lg:w-11/12 flex'>
					<div
						className={`dog ${isValidated ? 'valid' : 'bg-yellow'}`}
						style={{
							backgroundImageva: `url(${Dog})`,
						}}></div>
					<div className='w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none'>
						<form onSubmit={handleSignUp} className='bg-white'>
							<h1 className='text-gray-800 font-bold text-2xl mb-1'>
								Hello Again!
							</h1>
							<p className='text-sm font-normal text-gray-600 mb-7'>
								Welcome Back
							</p>
							<div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
										clipRule='evenodd'
									/>
								</svg>

								<input
									type='text'
									aria-describedby='name'
									className='pl-2 outline-none border-none'
									placeholder='Full name'
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4'
									/>
								</svg>
								<input
									type='text'
									aria-describedby='name'
									placeholder='Username '
									className='pl-2 outline-none border-none'
									value={username}
									onChange={(e) =>
										setUserName(e.target.value)
									}
								/>
							</div>
							<div className='flex items-center border-2 py-2 px-3 rounded-2xl mb-4'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
									/>
								</svg>
								<input
									className='pl-2 outline-none border-none'
									id='email'
									type='email'
									placeholder='email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='flex items-center border-2 py-2 px-3 rounded-2xl'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-gray-400'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
										clipRule='evenodd'
									/>
								</svg>

								<input
									type='password'
									className='pl-2 outline-none border-none'
									id='password'
									placeholder='Password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<button
								type='submit'
								className='block w-95 p-3 text-center rounded-sm dark:text-gray-900 dark:bg-violet-400'>
								Login
							</button>
							<span className='text-sm ml-2 hover:text-blue-500 cursor-pointer'>
								Forgot Password ?
							</span>

							<div className='flex items-center pt-4 space-x-1'>
								<div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
								<p className='px-3 text-sm dark:text-gray-400'>
									Login with social accounts
								</p>
								<div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
							</div>
							<div className='flex justify-center space-x-4'>
								<button
									aria-label='Log in with Google'
									onClick={signIn}
									className='p-3 rounded-sm'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 32 32'
										className='w-5 h-5 fill-current'>
										<path d='M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z'></path>
									</svg>
								</button>
								<button
									aria-label='Log in with Twitter'
									className='p-3 rounded-sm'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 32 32'
										className='w-5 h-5 fill-current'>
										<path d='M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z'></path>
									</svg>
								</button>
								<button
									aria-label='Log in with GitHub'
									className='p-3 rounded-sm'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 32 32'
										className='w-5 h-5 fill-current'>
										<path d='M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z'></path>
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Modal>
	);
}
