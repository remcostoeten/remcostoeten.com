import React, { useRef, useEffect, useState } from 'react';
import useGrilledEffect from './useGrilledEffect';
export default function Section() {
	const canvasRef = useRef();
	const [manPosition, setManPosition] = useState('');
	const [toggleColor, setToggleColor] = useState(false);

	useEffect(() => {
		const scrollMan = () => {
			const scrollY = window.scrollY;
			setManPosition(` ${scrollY * 0.35}px`);
		};

		window.addEventListener('scroll', scrollMan);
		return () => window.removeEventListener('scroll', scrollMan);
	}, []);

	useGrilledEffect(canvasRef, toggleColor);

	return (
		<>
			<div className='container contain pt-12 sm:pt-28 z-50'>
				<h1 className='z-50 swing-in-top-fwd hero-wrapper text-xxxxl text-white font-bold md:w-3/6 leading-12'>
					<span>
						Just another <span className='second'>front-end</span>{' '}
						developer
					</span>
					{/* <span>Just another</span>
					<span className='second'>
						{'\u00A0'}front-end{'\u00A0'}
					</span>
					<span className='third'> develope</span> */}
				</h1>
			</div>
			{/* <div className='h-screen z-50 interactive relative sm:py-0'> */}
			{/* <h2 className='sm:absolute sm:w-64 sm:mx-auto sm:left-10 translate-x-10 intro top-10 tracking-lighter text-5xl text-slate-300 font-extrabold left- top-1/4 z-5'>
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
			</h2> */}
			<div className='interactive__inner absolute top-0 -z-10'>
				<canvas
					style={{
						transition: 'all 0.2s ease-in-out',
						transform: `translateY(${manPosition})`,
						rotate: '${manPosition}',
					}}
					className='z-0'
					ref={canvasRef}
					id='canvas'></canvas>
			</div>
			{/* </div> */}
		</>
	);
}
