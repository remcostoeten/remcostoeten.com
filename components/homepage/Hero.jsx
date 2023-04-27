import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function Hero() {
	const [scrolled, setScrolled] = useState(false);
	const [backgroundPosition, setBackgroundPosition] = useState('0 80px');
	const [manPosition, setManPosition] = useState('0 0');

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setBackgroundPosition(`0 ${scrollY * 0.2}px`);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	useEffect(() => {
		const scrollMan = () => {
			const scrollY = window.scrollY;
			setManPosition(`0 -${scrollY * 2.2}px`);
		};

		window.addEventListener('scroll', scrollMan);
		return () => window.removeEventListener('scroll', manPosition);
	}, []);
	return (
		<main className='hero'>
			<div
				className='hero__inner '
				style={{
					backgroundPosition,
				}}>
				<div className='container relative'>
					{/* <div className={`hero__inner ${scrolled ? 'scrolled' : ''}`}> */}{' '}
					<Image
						className='absolute right-0 top-0'
						src='/man.png'
						alt='hero'
						style={{
							backgroundPosition,
						}}
						width={400}
						height={400}
					/>{' '}
					<h2 className=''>
						remco
						<br />
						stoeten
					</h2>{' '}
				</div>
			</div>
		</main>
	);
}
