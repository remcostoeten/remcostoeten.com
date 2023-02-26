import React, { useEffect, useRef, useState } from 'react';
import OffcanvasMenu from './OffcanvasMenu';
export default function Logo() {
	useEffect(() => {
		const elts = {
			text1: document.getElementById('text1'),
			text2: document.getElementById('text2'),
		};

		const texts = ['remco', 'stoeten'];

		const morphTime = 1;
		const cooldownTime = 0.25;

		let textIndex = texts.length - 1;
		let time = new Date();
		let morph = 0;
		let cooldown = cooldownTime;

		elts.text1.textContent = texts[textIndex % texts.length];
		elts.text2.textContent = texts[(textIndex + 1) % texts.length];

		function doMorph() {
			morph -= cooldown;
			cooldown = 0;

			let fraction = morph / morphTime;

			if (fraction > 1) {
				cooldown = cooldownTime;
				fraction = 1;
			}

			setMorph(fraction);
		}

		function setMorph(fraction) {
			elts.text2.style.filter = `blur(${Math.min(
				2 / fraction - 2,
				100,
			)}px)`;
			elts.text2.style.opacity = `${Math.pow(fraction, 0.1) * 100}%`;

			fraction = 1 - fraction;
			elts.text1.style.filter = `blur(${Math.min(
				2 / fraction - 2,
				100,
			)}px)`;
			elts.text1.style.opacity = `${Math.pow(fraction, 0.1) * 100}%`;

			elts.text1.textContent = texts[textIndex % texts.length];
			elts.text2.textContent = texts[(textIndex + 1) % texts.length];
		}

		function doCooldown() {
			morph = 0;

			elts.text2.style.filter = '';
			elts.text2.style.opacity = '100%';

			elts.text1.style.filter = '';
			elts.text1.style.opacity = '0%';
		}

		function animate() {
			requestAnimationFrame(animate);

			let newTime = new Date();
			let shouldIncrementIndex = cooldown > 0;
			let dt = (newTime - time) / 1000;
			time = newTime;

			cooldown -= dt;

			if (cooldown <= 0) {
				if (shouldIncrementIndex) {
					textIndex++;
				}

				doMorph();
			} else {
				doCooldown();
			}
		}

		animate();
	}, []);

	return (
		<>
			<div id='logo-container'>
				<span id='text1'></span>
				<span id='text2'></span>
			</div>

			<svg id='filters'>
				<defs>
					<filter id='threshold'>
						<feColorMatrix
							in='SourceGraphic'
							type='matrix'
							values='1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140'
						/>
					</filter>
				</defs>
			</svg>
		</>
		// <div className='logo'>
		// 	<svg
		// 		className=''
		// 		fill='none'
		// 		height='36'
		// 		viewBox='0 0 32 32'
		// 		width='36'
		// 		xmlns='http://www.w3.org/2000/svg'>
		// 		<rect
		// 			fill='var(--secondary)'
		// 			height='100%'
		// 			rx='16'
		// 			width='100%'
		// 		/>
		// 		<path
		// 			clipRule='evenodd'
		// 			d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
		// 			fill='currentColor'
		// 			fillRule='evenodd'
		// 		/>
		// 	</svg>
		// </div>
	);
}
