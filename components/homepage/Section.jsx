import React, { useRef, useEffect, useState } from 'react';
import useGrilledEffect from './useGrilledEffect';
export default function Section() {
	const canvasRef = useRef();

	useGrilledEffect(canvasRef);
	const [scrolled, setScrolled] = useState(false);
	const [backgroundPosition, setBackgroundPosition] = useState('0 0');
	const [manPosition, setManPosition] = useState(' -300px');
	const [textPosition, setTextPosition] = useState('0');
	const [isRed, setIsRed] = useState(true);

	const toggleColor = () => {
		setIsRed(!isRed);
	};
	useEffect(() => {
		const scrollMan = () => {
			const scrollY = window.scrollY;
			setManPosition(` ${scrollY * 0.35}px`);
		};

		window.addEventListener('scroll', scrollMan);
		return () => window.removeEventListener('scroll', manPosition);
	}, []);

	return (
		<div className='interactive relative'>
			<div className='interactive__inner container'>
				<h2 className='translate-x-10 absolute intro tracking-lighter text-5xl text-slate-300 font-extrabold left-8 top-1/4 z-10'>
					<span className='intro__line-one'>
						<span className='letter'>J</span>
						<span className='letter'>u</span>
						<span className='letter'>s</span>
						<span className='letter'>t</span>
						<span className='letter'>&nbsp;</span>
						<span className='letter'>a</span>
						<span className='letter'>n</span>
						<span className='letter'>o</span>
						<span className='letter'>t</span>
						<span className='letter'>h</span>
						<span className='letter'>e</span>
						<span className='letter'>r</span>
					</span>
					<br />
					<span className='text-slate-300 line-two'>
						<span className='letter'>f</span>
						<span className='letter'>r</span>
						<span className='letter'>o</span>
						<span className='letter'>n</span>
						<span className='letter'>t</span>
						<span className='letter'>-</span>
						<span className='letter'>e</span>
						<span className='letter'>n</span>
						<span className='letter'>d</span>
						<span className='letter'>&nbsp;</span>
						<span className='letter'>d</span>
						<span className='letter'>e</span>
						<span className='letter'>v</span>
					</span>
					<span className='intro__dot'>.</span>
				</h2>
			</div>
			<canvas
				style={{
					transition: 'all 0.2s ease-in-out',
					transform: `translateY(${manPosition})`,
					rotate: '${manPosition}',
				}}
				ref={canvasRef}
				id='canvas'></canvas>
		</div>
	);
}
