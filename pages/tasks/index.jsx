import { useState, useEffect } from 'react';
import { singInWithGoogle, auth, logout } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import SlideButton from '@/components/ui-elements/buttons/RetroButton';
import Lost from '@/components/task/Lost';

export default function LoginPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setIsOpen(false);
			} else {
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const handleLogout = async () => {
		await logout();
		setUser(null);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		console.log('tsest');
		setIsOpen(true);
	};

	return (
		<>
			<div className='mt-36 container concotain'>
				{user ? (
					<>
						<h1 className='text-2xl font-semibold mb-4'>
							Welcome {user.displayName}, you're authenticated.
						</h1>
						<button
							onClick={handleLogout}
							className='bg-red-600 text-white px-4 py-2 rounded'>
							Logout
						</button>
					</>
				) : (
					<div>
						<div className='not-authorized flex items-center pt-20 -mt-60'>
							<div className='not-authorized__inner'>
								<h2 className='pt-2 leading-7 text-gray-300'>
									Oops! Not authorized<br></br>for this page.
								</h2>
								<p className='leading-5 mt-4 mb-2 text-gray-300'>
									You should be logged in in order to use the
									task/to-do app.<br></br> You obviously don`t
									want another user to edit your tasks, do
									you?
								</p>
								<div className='not-authorized__buttons'>
									<div onClick={openModal}>
										<SlideButton
											label='Sign In'
											onClick={openModal}
											textColor='text-indigo-600 border-2 border-indigo-600 cta-two '
										/>
									</div>
									<SlideButton
										label='Or return home'
										link='/'
										textColor='text-indigo-600 border-2 border-indigo-600'
									/>
								</div>
							</div>
							<div className='lost'>
								<div className='lost__animation'>
									<Lost />
								</div>
							</div>
						</div>
					</div>
				)}
				{isOpen && (
					<div className='fixed inset-0 flex items-center justify-center z-50'>
						<div
							className='absolute inset-0 bg-black opacity-50'
							onClick={closeModal}></div>
						<div className='relative bg-white p-6 rounded shadow-md w-80 z-50'>
							<h2 className='text-xl font-semibold mb-4'>
								Login
							</h2>
							<button
								onClick={singInWithGoogle}
								className='w-full bg-blue-600 text-white px-4 py-2 rounded mb-4'>
								Login with Google
							</button>
							<button
								onClick={closeModal}
								className='w-full bg-gray-300 text-black px-4 py-2 rounded'>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
