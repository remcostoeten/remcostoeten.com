import React, { useEffect, useRef, useState } from 'react';

import BlobOne from '../svg-elements/BlobOne';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OffcanvasMenuLinks from './OffcanvasMenuLinks';
const Toggle = () => {
	const toggleRef = useRef(null);
	const [email, setEmail] = useState('');
	const [menuOpen, setMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [hoveredClasses, setHoveredClasses] = useState([]);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [isRegisterModalOpen, setisRegisterModalOpen] = useState(false);
	const router = useRouter();
	const [showAuthModal, setShowAuthModal] = useState(false);

	const handleOpenLoginModal = () => {
		setIsLoginModalOpen(true);
		setMenuOpen(false);
	};

	const handleCloseMenu = () => {
		setMenuOpen(false);
		console.log('test');
	};

	const handleCloseLoginModal = () => {
		setIsLoginModalOpen(false);
	};

	const handleOpenRegisterModal = () => {
		setisRegisterModalOpen(true);
		setMenuOpen(false);
	};

	const handleCloseRegisterModal = () => {
		setisRegisterModalOpen(false);
	};

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

	const handleClose = () => {
		setMenuOpen(false);
	};

	const handleSignIn = () => {
		setIsLoginModalOpen(false);
		onSignIn(email, password, rememberMe);
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
						<OffcanvasMenuLinks handleCloseMenu={handleCloseMenu} />
						<div className='offcanvas-menu__bottom'>
							<button className='btn btn--menu w-fit'>
								<Link
									onClick={handleCloseMenu}
									href='https://github.com/remcostoeten'
									target='blank'>
									Github
								</Link>
							</button>
							<button className='btn  w-fit btn--menu whatsapp'>
								<Link
									onClick={handleCloseMenu}
									href='https://wa.me/31636590707'>
									Text or call
								</Link>
							</button>
						</div>
					</div>

					<BlobOne />
				</div>
			)}
		</>
	);
};

export default Toggle;
