import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const Toggle: React.FC = () => {
	const toggleRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const toggle = toggleRef.current;
		const animate = setInterval(() => {
			if (toggle) {
				toggle.checked = !toggle.checked;
			}
		}, 3000);

		return () => {
			clearInterval(animate);
		};
	}, []);

	return (
		<>
			<label className='toggle'>
				<input type='checkbox' ref={toggleRef} />
				<div>
					<div>
						<span></span>
						<span></span>
					</div>
					<svg>
						<use xlinkHref='#path' />
					</svg>
					<svg>
						<use xlinkHref='#path' />
					</svg>
				</div>
			</label>

			<svg xmlns='http://www.w3.org/2000/svg' style={{ display: 'none' }}>
				<symbol
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 44 44'
					id='path'>
					<path d='M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22'></path>
				</symbol>
			</svg>
		</>
	);
};

export default Toggle;
