import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function bodyClass({}) {}
function OffcanvasMenu() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (size.width > 768 && menuOpen) {
			setMenuOpen(false);
		}
	}, [size.width, menuOpen]);

	const menuToggleHandler = () => {
		setMenuOpen((p) => !p);
		document.body.classList.add('menuOpen');
	};
	useEffect(() => {
		if (menuOpen === false) {
			document.body.classList.remove('menuOpen');
		}
	});
	return (
		<div className='header__content'>
			<nav
				className={`${'header__content__nav'} 
          ${menuOpen && size.width < 768 ? `${'isMenu'}` : ''} 
          }`}>
				<ul>
					<li>
						<a href='/Login'>Back to home</a>
					</li>
					<li>
						<a
							href='https://github.com/remcostoeten/'
							target='_blank'
							rel='noreferrer'>
							Github
						</a>
					</li>
					<li>
						<a
							href='https://www.linkedin.com/in/remco-stoeten-a2a453161/'
							target='_blank'
							rel='noreferrer'>
							Linkedin
						</a>
					</li>
					<li>
						<Link href='/Authentication'>Back to home</Link>
					</li>
					<li>
						<a href=''>Contact</a>
					</li>
				</ul>
			</nav>
			<div className='header__toggle'>
				{!menuOpen ? (
					<div className='offcanvas' onClick={menuToggleHandler}>
						<div className='hamburger'>
							<div className='hamburger__line'></div>
							<div className='hamburger__line'></div>
							<div className='hamburger__line'></div>
						</div>
					</div>
				) : (
					<div onClick={menuToggleHandler}>
						<div className='close'>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default OffcanvasMenu;
