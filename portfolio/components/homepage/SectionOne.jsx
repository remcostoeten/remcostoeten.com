import { useEffect, useRef, useState } from 'react';
import SectionTwo from './SectionTwo';
import Image from 'next/image';
import Link from 'next/link';
import styles from './SectionOne.module.css';

export default function SectionOne() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [bgColor, setBgColor] = useState('bg-peach');
	const secondSectionRef = useRef();
	const [scrolled, setScrolled] = useState(false);
	const [backgroundPosition, setBackgroundPosition] = useState('0 0');
	const [birdRotation, setBirdRotation] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setBackgroundPosition(`0 -${scrollY * 0.67}px`);
			setBirdRotation(scrollY * 0.1);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const position = window.pageYOffset;
			const secondSection = secondSectionRef.current;

			if (
				position >= secondSection.offsetTop &&
				position <= secondSection.offsetTop + secondSection.offsetHeight
			) {
				gsap.to(secondSection, {
					backgroundColor: 'green',
					duration: 0.5,
				});
			} else {
				gsap.to(secondSection, {
					backgroundColor: 'peach',
					duration: 0.5,
				});
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div>
				<section className="bg-white relative">
					<Image
						className="paralax__left-mountain absolute bottom-0 z-50"
						src="/paralax/mountain-left.png"
						alt="Picture of the author"
						width={1442}
						height={234}
					/>
					<div
						className="paralax relative min-h-screen hero-image bg-right-bottom flex bg-contain bg-no-repeat"
						style={{
							backgroundImage: `url(/paralax/mountain-back.png)`,
						}}
					>
						<div
							className={`${styles.paralaxWrapper} container flex justify-items-start flex-col translate-y w-full h-screen pt-2/4`}
						>
							<div className="ball-wrapper">
								<span
									className="ball w-96 h-96 absolute left-1/4 z-30 bg-peach rounded-full"
									style={{
										transform: `translateY(${
											scrollPosition * 0.4
										}px)`,
									}}
								></span>
								<div
									className={`${styles.birdsWrapper}`}
									style={{
										transform: `rotate(${birdRotation}deg)`,
									}}
								>
									<Image
										className={`${styles.birds}`}
										src="/paralax/birds.png"
										alt="birds"
										width={228}
										height={93}
									/>
								</div>
							</div>
							<div className="text">
								<h1 className="paralax-text relative z-50 uppercase to-black roboto flex flex-col leading-8 font-black mb-4">
									Remco Stoeten{' '}
									<span>Front-end developer</span>
								</h1>
								<h4 className="opacity-75 z-50">
									Aspiring to be more than a divjesschuiver
								</h4>
								<Link
									className="box-border flex flex-row items-start gap-10 absolute w-116 h-53 left-122 top-480 border-b-5 border-black"
									href="/about"
								>
									Scroll for weeeee paralax
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
			<SectionTwo ref={secondSectionRef} />
		</>
	);
}
