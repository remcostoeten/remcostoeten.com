import React, { useEffect, useRef, useState } from 'react';
import BlobOne from '../svg-elements/BlobOne';
import Link from 'next/link';

const Toggle = () => {
	const toggleRef = useRef(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [hoveredClasses, setHoveredClasses] = useState([]);

	const links = [
		{ href: '/', text: 'Home', classes: [] },

		{ href: 'contact', text: 'Contact', classes: ['hovered-2'] },
		{ href: 'product', text: 'Stripe payment', classes: ['hovered-3'] },
	];

	const handleMouseEnter = (index) => {
		setHoveredIndex(index);
		setHoveredClasses([
			...hoveredClasses.slice(0, index),
			`hovered-${index}`,
			...hoveredClasses.slice(index + 1),
		]);
	};

	const handleMouseLeave = (index) => {
		setHoveredIndex(null);
		setHoveredClasses(
			hoveredClasses.filter((cls) => !cls.includes(`hovered-${index}`)),
		);
	};
	const parentClass = `offcanvas-menu ${hoveredClasses.join(' ')}`;

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

	// Create function to close the toggle when clicked on Link
	const handleClose = () => {
		setMenuOpen(false);
		console.log('test');
	};

	return (
		<>
			<label className='toggle'>
				<input type='checkbox' ref={toggleRef} onClick={handleToggle} />
				<div className='toggle__inner'>
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
				<div className={parentClass}>
					<div className='container'>
						<div className='offcanvas-menu__menu'>
							<div className='offcanvas-menu__menu--tagline'>
								<h2 className='animate__flipInX'>
									Remco stoeten
								</h2>
								<p className='first'>
									<span>Aspiring to be more</span>
								</p>
								<p className='last'>
									than a <i>divjesschuiver</i>
								</p>
							</div>
							<ul>
								{links.map((link, index) => (
									<li key={index}>
										<Link
											onClick={handleClose}
											href={link.href}
											className={link.classes.join(' ')}
											onMouseEnter={() =>
												handleMouseEnter(index)
											}
											onMouseLeave={() =>
												handleMouseLeave(index)
											}>
											{link.text}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='offcanvas-menu__bottom'>
						<button className='btn btn--menu'>
							<Link
								href='https://github.com/remcostoeten'
								target='blank'>
								Github
							</Link>
						</button>
					</div>
					<BlobOne />
				</div>
			)}
		</>
	);
};

export default Toggle;
