import React, { MouseEvent, useEffect, useState } from 'react';
import SvgBlobs from '@/components/Homepage/SvgBlobs';

export default function Menu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [rotateX, setRotateX] = useState(-20);
	const [rotateY, setRotateY] = useState(45);

	useEffect(() => {
		document.body.classList.add('abstract');
		const titleContainer = document.querySelector(
			'.title-container',
		) as HTMLElement;
		const body = document.querySelector('body') as HTMLElement;
		if (titleContainer) {
			titleContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		}
		if (body) {
			body.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		}
	}, [rotateX, rotateY]);

	function toggleMenu(e: MouseEvent<HTMLAnchorElement>) {
		setIsMenuOpen(!isMenuOpen);
		e.preventDefault();
	}

	function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
		const newX = -(e.clientX / window.innerWidth - 0.5) * 15;
		const newY = (e.clientY / window.innerHeight - 0.5) * 25;
		setRotateX(newX);
		setRotateY(newY);
	}

	return (
		<div className='container' onMouseMove={handleMouseMove}>
			<div
				className={`menu-container ${isMenuOpen ? 'full-menu' : ''}`}
				id='toggle'>
				<a href='#' className='menu' onClick={toggleMenu}>
					<i
						className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}
						aria-hidden='true'></i>
				</a>
			</div>
			<div className='title-container'>
				<h1>
					<span>remcostoeten</span>
					<br />I also don't know.
				</h1>
				<div className='circle'></div>
			</div>

			<SvgBlobs />
			<div className={`overlay ${isMenuOpen ? 'open' : ''}`} id='overlay'>
				<nav className='overlay-menu'>
					<ul>
						<li>
							<a href='#'>Home</a>
						</li>
						<li>
							<a href='#'>Tour</a>
						</li>
						<li>
							<a href='#'>Features</a>
						</li>
						<li>
							<a href='#'>Contact</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
