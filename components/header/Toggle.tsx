import React, { useEffect, useRef, useState } from 'react';
import SvgLines from '@/components/Homepage/svg/SvgLines';
import GradientBg from '../Homepage/svg/GradientBg';
import BlobOne from '../Homepage/svg/BlobOne';
import ParticleBackground from '../Homepage/ParticleBackground';
import MouseFollower from '../Homepage/MouseFollower';
import SvgBlobs from '../Homepage/SvgBlobs';

const Toggle: React.FC = () => {
	const toggleRef = useRef<HTMLInputElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);

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

	const handleToggle = () => {
		setMenuOpen(!menuOpen);
		if (!menuOpen) {
			document.body.classList.add('offcanvas-open');

			setTimeout(() => {
				document.body.classList.add('menu-delay');
			}, 500);
		} else {
			document.body.classList.remove('offcanvas-open');
			document.body.classList.remove('menu-delay');
		}
	};
	return (
		<>
			<label className='toggle'>
				<input type='checkbox' ref={toggleRef} onClick={handleToggle} />
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

			{menuOpen && (
				<div className='offcanvas-menu'>
					<div className='offcanvas-menu__menu'>
						<h2>Remco stoeten</h2>
						<p>
							<span>Aspiring to be more</span>
						</p>
						<p>
							than a <i>divjesschuiver</i>
						</p>

						<ul>
							<li>Menu Item 1</li>
							<li>Menu Item 2</li>
							<li>Menu Item 3</li>
							<li>Menu Item 4</li>
						</ul>
					</div>
					<div className='offcanvas-menu__blob'></div>
					{/* <BlobOne /> */}
				</div>
			)}
		</>
	);
};

export default Toggle;
