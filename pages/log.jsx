import Link from 'next/link';
export default function Log() {
	useEffect(() => {
		document.body.classList.add('login');
		return () => {
			document.body.classList.remove('login');
		};
	}, []);

	return (
		<>
			<div className='login__container flex '>
				<div className=' bg-login-pink bg-center login__illustration  w-1/3 bg-art bg-art bg-contain bg-no-repeat'>
					<div className='inner px-6 py-6'>
						<h1 className='my-10 font-black text-xl leading-4 w-48	text-off-pink'>
							Welcome the my experimental & tooling site
						</h1>
					</div>
				</div>
				<div className='login__form w-64 flex-1 w-2/3 '>
					<div className='form__inner'>
						<section className='bg-white'>
							<div className='container flex items-center justify-center min-h-screen px-6 mx-auto'>
								<form className='w-full max-w-md'>
									<div className='flex items-center justify-center mt-6'>
										<Link
											href='#'
											className='w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300'>
											sign in
										</Link>
										<Link
											href='#'
											className='w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white'>
											sign up
										</Link>
									</div>
									<div className='relative flex items-center mt-8'>
										<span className='absolute'></span>
									</div>
									<div className='relative flex items-center mt-4'>
										<span className='absolute'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												strokeWidth={2}>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
												/>
											</svg>
										</span>
										<input
											type='text'
											className='block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
											placeholder='name'
										/>
									</div>
									<div className='relative flex items-center mt-6'>
										<span className='absolute'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												strokeWidth={2}>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
												/>
											</svg>
										</span>
										<input
											type='email'
											className='block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
											placeholder='Email address'
										/>
									</div>
									<div className='relative flex items-center mt-4'>
										<span className='absolute'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-6 h-6 mx-3 text-gray-300 dark:text-gray-500'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
												strokeWidth={2}>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
												/>
											</svg>
										</span>
										<input
											type='password'
											className='block w-full px-10 py-3 text-gray-700 bg-white border rounded-  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
											placeholder='Password'
										/>
									</div>

									<div className='mt-6'>
										<button className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
											Sign Up
										</button>
										<div className='mt-6 text-center '>
											<a
												href='#'
												className='text-sm text-blue-500 hover:underline dark:text-blue-400'>
												Already have an account?
											</a>
										</div>
									</div>
								</form>
							</div>
						</section>
					</div>
				</div>
			</div>
		</>
	);
}
