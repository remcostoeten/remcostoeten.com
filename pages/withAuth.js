import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';

const withAuth = (WrappedComponent) => {
	const Wrapper = (props) => {
		const [user, setUser] = useState(null);
		const router = useRouter();
		const [yAxis, setYAxis] = useState(0);
		const [xAxis, setXAxis] = useState(0);

		useEffect(() => {
			const unsubscribe = auth.onAuthStateChanged((user) => {
				setUser(user);
			});
			return unsubscribe;
		}, []);

		useEffect(() => {
			document.body.classList.add('not-authenticated');
			return () => {
				document.body.classList.remove('not-authenticated');
			};
		}, []);

		useEffect(() => {
			if (user && user.email !== 'stoetenremco.rs@gmail.com') {
				router.push('/');
			}
		}, [user, router]);

		if (user && user.email === 'stoetenremco.rs@gmail.com') {
			return <WrappedComponent {...props} user={user} />;
		}

		const handleMouseMove = (event) => {
			const pageX = document.documentElement.clientWidth;
			const pageY = document.documentElement.clientHeight;
			const mouseY = event.pageY;
			const mouseX = event.pageX;

			//verticalAxis
			const newAxisY = ((pageY / 2 - mouseY) / pageY) * 300;
			setYAxis(newAxisY);

			//horizontalAxis
			const newAxisX = -((mouseX / pageX) * 100) - 100;
			setXAxis(newAxisX);
		};

		return (
			<div className='error'>
				<div className='wrap'>
					<div className='tear'></div>
					<div className='tear2'></div>
					<div className='face'>
						<div className='eyebrow'>︶</div>
						<div className='eyebrow'>︶</div>
						<div className='eye'></div>
						<div className='eye'></div>
						<div className='mouth'></div>
					</div>
				</div>
				<div className='error__description'>
					<div className='error__description-container'>
						<div className='error__description-title'>Sorry!</div>
						<div className='error__description-text'>
							You&apos;re not allowed to view this page! No need
							to be sad, you can still view the public demo
							<Link href='/whatsapp-export'> here</Link>.
						</div>
						<Link href='/' className='error__button'>
							or return to home
						</Link>
					</div>
				</div>
			</div>
		);
	};

	return Wrapper;
};

export default withAuth;
