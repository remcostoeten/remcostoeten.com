import React, { useEffect, useRef, useState } from 'react';
import BlobOne from '../svg-elements/BlobOne';
import Link from 'next/link';

const Toggle = () => {
	const toggleRef = useRef(null);
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
							<ul className='animated-list'>
								<li>
									<Link href='/'>Home</Link>
								</li>
								<li>
									<Link href='https://github.com/remcostoeten'>
										Github
									</Link>
								</li>
								<li>
									<Link href='contact'>Contact</Link>
								</li>
								<li>
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
					<div className='offcanvas-menu__blob mobile'></div>
					<BlobOne />{' '}
				</div>
			)}
		</>
	);
};

export default Toggle;
