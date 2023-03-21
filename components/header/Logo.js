// import React, { useEffect, useRef, useState } from 'react';
// import OffcanvasMenu from './OffcanvasMenu';
// export default function Logo() {
// 	useEffect(() => {
// 		const elts = {
// 			text1: document.getElementById('text1'),
// 			text2: document.getElementById('text2'),
// 		};

// 		const texts = ['remco', 'stoeten'];

// 		const morphTime = 1;
// 		const cooldownTime = 0.25;

// 		let textIndex = texts.length - 1;
// 		let time = new Date();
// 		let morph = 0;
// 		let cooldown = cooldownTime;

// 		elts.text1.textContent = texts[textIndex % texts.length];
// 		elts.text2.textContent = texts[(textIndex + 1) % texts.length];

// 		function doMorph() {
// 			morph -= cooldown;
// 			cooldown = 0;

// 			let fraction = morph / morphTime;

// 			if (fraction > 1) {
// 				cooldown = cooldownTime;
// 				fraction = 1;
// 			}

// 			setMorph(fraction);
// 		}

// 		function setMorph(fraction) {
// 			elts.text2.style.filter = `blur(${Math.min(
// 				2 / fraction - 2,
// 				100,
// 			)}px)`;
// 			elts.text2.style.opacity = `${Math.pow(fraction, 0.1) * 100}%`;

// 			fraction = 1 - fraction;
// 			elts.text1.style.filter = `blur(${Math.min(
// 				2 / fraction - 2,
// 				100,
// 			)}px)`;
// 			elts.text1.style.opacity = `${Math.pow(fraction, 0.1) * 100}%`;

// 			elts.text1.textContent = texts[textIndex % texts.length];
// 			elts.text2.textContent = texts[(textIndex + 1) % texts.length];
// 		}

// 		function doCooldown() {
// 			morph = 0;

// 			elts.text2.style.filter = '';
// 			elts.text2.style.opacity = '100%';

// 			elts.text1.style.filter = '';
// 			elts.text1.style.opacity = '0%';
// 		}

// 		function animate() {
// 			requestAnimationFrame(animate);

// 			let newTime = new Date();
// 			let shouldIncrementIndex = cooldown > 0;
// 			let dt = (newTime - time) / 1000;
// 			time = newTime;

// 			cooldown -= dt;

// 			if (cooldown <= 0) {
// 				if (shouldIncrementIndex) {
// 					textIndex++;
// 				}

// 				doMorph();
// 			} else {
// 				doCooldown();
// 			}
// 		}

// 		animate();
// 	}, []);

// 	return (
// 		<>
// 			<div id='logo-container'>
// 				<span id='text1'></span>
// 				<span id='text2'></span>
// 			</div>

// 			<svg id='filters'>
// 				<defs>
// 					<filter id='threshold'>
// 						<feColorMatrix
// 							in='SourceGraphic'
// 							type='matrix'
// 							values='1 0 0 0 0
// 									0 1 0 0 0
// 									0 0 1 0 0
// 									0 0 0 255 -140'
// 						/>
// 					</filter>
// 				</defs>
// 			</svg>
// 		</>
// 		// <div className='logo'>
// 		// 	<svg
// 		// 		className=''
// 		// 		fill='none'
// 		// 		height='36'
// 		// 		viewBox='0 0 32 32'
// 		// 		width='36'
// 		// 		xmlns='http://www.w3.org/2000/svg'>
// 		// 		<rect
// 		// 			fill='var(--secondary)'
// 		// 			height='100%'
// 		// 			rx='16'
// 		// 			width='100%'
// 		// 		/>
// 		// 		<path
// 		// 			clipRule='evenodd'
// 		// 			d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
// 		// 			fill='currentColor'
// 		// 			fillRule='evenodd'
// 		// 		/>
// 		// 	</svg>
// 		// </div>
// 	);
// }

import React from 'react';

export default function Logo() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='30'
			height='32'
			viewBox='0 0 36 32'
			fill='none'
			class='css-1170n61'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z'
				fill='#fff'></path>
		</svg>
	);
}
