// Section.js
import React, { useRef } from 'react';
import Hero from './/Hero';
import useGrilledEffect from './useGrilledEffect';

export default function Section() {
	const canvasRef = useRef();

	useGrilledEffect(canvasRef);

	return (
		<div className='interactive relative h-screen'>
			<div className='interactive__inner container'>
				<h2 className='absolute intro tracking-lighter text-5xl text-slate-300 font-extrabold left-8 top-1/4'>
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
			<canvas ref={canvasRef} id='canvas'></canvas>;
		</div>
	);
}
