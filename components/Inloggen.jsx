import { useState } from 'react';

const SignUp = () => {
	const [isRightPanelActive, setIsRightPanelActive] = useState(false);

	const handleSignUpClick = () => {
		setIsRightPanelActive(true);
	};

	const handleSignInClick = () => {
		setIsRightPanelActive(false);
	};

	return (
		<div className='container mx-auto max-w-screen-lg'>
			<div
				className={`form-container ${
					isRightPanelActive ? 'right-panel-active' : ''
				}`}>
				<form action='#'>
					<h1>Create Account</h1>
					<div className='social-container'>
						<a href='#' className='social'>
							<i className='fab fa-facebook-f'></i>
						</a>
						<a href='#' className='social'>
							<i className='fab fa-google-plus-g'></i>
						</a>
						<a href='#' className='social'>
							<i className='fab fa-linkedin-in'></i>
						</a>
					</div>
					<span>or use your email for registration</span>
					<input
						type='text'
						placeholder='Name'
						className='w-full bg-gray-200 border-none rounded-lg py-3 px-4 my-2'
					/>
					<input
						type='email'
						placeholder='Email'
						className='w-full bg-gray-200 border-none rounded-lg py-3 px-4 my-2'
					/>
					<input
						type='password'
						placeholder='Password'
						className='w-full bg-gray-200 border-none rounded-lg py-3 px-4 my-2'
					/>
					<button
						className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg my-2 transition-transform duration-80 ease-in uppercase focus:outline-none'
						type='submit'>
						Sign Up
					</button>
				</form>
			</div>
			<div
				className={`form-container sign-in-container ${
					isRightPanelActive ? 'right-panel-active' : ''
				}`}>
				<form action='#'>
					<h1>Sign in</h1>
					<div className='social-container'>
						<a href='#' className='social'>
							<i className='fab fa-facebook-f'></i>
						</a>
						<a href='#' className='social'>
							<i className='fab fa-google-plus-g'></i>
						</a>
						<a href='#' className='social'>
							<i className='fab fa-linkedin-in'></i>
						</a>
					</div>
					<span>or use your account</span>
					<input
						type='email'
						placeholder='Email'
						className='w-full bg-gray-200 border-none rounded-lg py-3 px-4 my-2'
					/>
					<input
						type='password'
						placeholder='Password'
						className='w-full bg-gray-200 border-none rounded-lg py-3 px-4 my-2'
					/>
					<a href='#' className='text-blue-500 hover:text-blue-700'>
						Forgot your password?
					</a>
					<button
						className='w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg my-2 transition-transform duration-80 ease-in uppercase focus:outline-none'
						type='submit'>
						Sign In
					</button>
				</form>
			</div>
			<div
				className={`overlay-container ${
					isRightPanelActive ? 'right-panel-active' : ''
				}`}>
				<div className='overlay'>
					<div className='overlay-panel overlay-left'>
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your
							personal info
						</p>
						<button
							className='ghost w-full bg-white text-red-500 font-bold py-3 px-4 rounded-lg my-2 transition-transform duration-80 ease-in uppercase focus:outline-none'
							id='signIn'
							onClick={handleSignInClick}>
							Sign In
						</button>
					</div>
					<div className='overlay-panel overlay-right'>
						<h1>Hello, Friend!</h1>
						<p>
							Enter your personal details and start journey with
							us
						</p>
						<button
							className='ghost w-full bg-white text-red-500 font-bold py-3 px-4 rounded-lg my-2 transition-transform duration-80 ease-in uppercase focus:outline-none'
							id='signUp'
							onClick={handleSignUpClick}>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white text-center py-4'>
			<p>
				Created with <i className='fa fa-heart text-red-500'></i> by{' '}
				<a
					href='https://florin-pop.com'
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-400 hover:text-blue-200'>
					Florin Pop
				</a>{' '}
				- Read how I created this and how you can join the challenge{' '}
				<a
					href='https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-400 hover:text-blue-200'>
					here
				</a>
				.
			</p>
		</footer>
	);
};

const DoubleSliderSignInUpForm = () => {
	return (
		<>
			<SignUp />
			<Footer />
		</>
	);
};

export default DoubleSliderSignInUpForm;
