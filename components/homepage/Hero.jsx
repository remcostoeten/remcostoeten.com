import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function Hero() {
	const [scrolled, setScrolled] = useState(false);
	const [backgroundPosition, setBackgroundPosition] = useState('0 0');
	const [manPosition, setManPosition] = useState(' 0');

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setBackgroundPosition(`0 -${scrollY * 0.67}px`);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	useEffect(() => {
		const scrollMan = () => {
			const scrollY = window.scrollY;
			setManPosition(` ${scrollY * 0.55}px`);
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
				<div className='container relative container`'>
					<div
						className={`hero__inner ${scrolled ? 'scrolled' : ''}`}>
						<Image
							className='absolute right-0 top sm:hidden'
							src='/man.png'
							alt='hero'
							style={{
								transform: `translateY(${manPosition})`,
								rotate: '${manPosition}',
							}}
							width={400}
							height={400}
						/>
						<h2 className='bold text-white text-8xl leading-none'>
							Just another
							<br />
							<span>front-end dev</span>.
						</h2>
					</div>
				</div>
			</div>
		</main>
	);
}
