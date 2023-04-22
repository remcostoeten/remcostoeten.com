import React, { useEffect, useRef, useState } from 'react';
import BlobOne from '../svg-elements/BlobOne';
import Link from 'next/link';
import { useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Toggle = () => {
	const toggleRef = useRef(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const isSmallScreen = useMediaQuery('(max-width:768px)');
	const [hovered, setHovered] = useState(false);
	const [hoveredClasses, setHoveredClasses] = useState([]);

	const handleMouseEnter = (index) => {
		const newClasses = [...hoveredClasses];
		newClasses[index] = `hovered--${index + 1}`;
		setHoveredClasses(newClasses);
		setHovered(true);
	};

	const handleMouseLeave = (index) => {
		const newClasses = [...hoveredClasses];
		newClasses[index] = '';
		setHoveredClasses(newClasses);
		setHovered(false);
	};

	const parentClass = hovered ? 'offcanvas-menu hovered' : 'offcanvas-menu';

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
								<li
									onMouseEnter={() => handleMouseEnter(0)}
									onMouseLeave={() => handleMouseLeave(0)}
									className={hoveredClasses[0]}>
									<Link href='/'>Home</Link>
								</li>
								<li
									onMouseEnter={() => handleMouseEnter(1)}
									onMouseLeave={() => handleMouseLeave(1)}
									className={hoveredClasses[1]}>
									<Link href='https://github.com/remcostoeten'>
										Github
									</Link>
								</li>
								<li
									onMouseEnter={() => handleMouseEnter(2)}
									onMouseLeave={() => handleMouseLeave(2)}
									className={hoveredClasses[2]}>
									<Link href='contact'>Contact</Link>
								</li>
								<li
									onMouseEnter={() => handleMouseEnter(3)}
									onMouseLeave={() => handleMouseLeave(3)}
									className={hoveredClasses[3]}>
									<Link href='Login'>Login</Link>
								</li>
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
					{isSmallScreen && (
						<div className='offcanvas-menu__blob mobile'></div>
					)}
					{isSmallScreen && <BlobOne />}
					<BlobOne />
				</div>
			)}
		</>
	);
};

export default Toggle;
