import React, { useEffect, useState } from 'react';
import Logo from '../ui-elements/Logo';
import Toggle from './Toggle';
import OffcanvasMenuLinks from './OffcanvasMenuLinks';
import 'animate.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import DnaWaves from '../experimental/DnaWaves';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [sticky, setSticky] = useState(false);
	const [shouldAnimate, setShouldAnimate] = useState(false);
	const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

	const handleCloseMenu = () => {
		setMenuOpen(false);
	};

	const handleToggle = () => {
		setMenuOpen(!menuOpen);
	};

	useEffect(() => {
		const handleScroll = () => {
			setSticky(window.scrollY > 0);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		document.body.classList.toggle('offcanvas-open', menuOpen);
	}, [menuOpen]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShouldAnimate(menuOpen);
		}, 2000);

		return () => clearTimeout(timer);
	}, [menuOpen]);

	return (
		<>
			<div
				className={`header relative top-0 flex align-middle w-full transition-all ${
					menuOpen ? 'menu-open' : ''
				} ${sticky ? 'sticky' : ''}`}
			>
				<div className="contain contain-space flex z-20 justify-between mt-4 animate__animated animate__fadeIn animate__slower">
					<Logo className="animate__animated animate__bounceInLeft animate__slower" />
					{menuOpen && (
						<>
							<div className="offcanvas-menu text-offWhite ml-6 animate__animated animate__fadeIn animate__slower">
								<div className="offcanvas-menu__menu--tagline mb-12 ml-3 mt-10">
									<h2 className="animate__animated animate__slower">
										Remco stoeten
									</h2>
									<p className="first">
										<span className="animate__animated animate__bounceInDown animate__slower">
											Aspiring to be more
										</span>
									</p>
									<p className="last">
										<i className="animate__animated animate__fadeInUp animate__slower">
											than a divjesschuiver
										</i>
									</p>
								</div>
								<div className="flex flex-col mb-8 mt-10 ml-2">
									<OffcanvasMenuLinks
										handleCloseMenu={handleCloseMenu}
									/>
								</div>
							</div>
							<div className="absolute">
								<DnaWaves />
							</div>
						</>
					)}
					<Toggle
						menuOpen={menuOpen}
						setMenuOpen={setMenuOpen}
						handleCloseMenu={handleCloseMenu}
						className="animate__animated animate__bounceInRight animate__slower"
					/>
				</div>
			</div>
		</>
	);
}
