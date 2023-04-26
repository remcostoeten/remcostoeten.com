import React, { useEffect, useRef, useState } from 'react';

import BlobOne from '../svg-elements/BlobOne';
import Link from 'next/link';
import SignUp from '../auth/SignUp';
import { useRouter } from 'next/router';

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
	const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

	const handleOpenSignUpModal = () => {
		setIsSignUpModalOpen(true);
	};

	const handleCloseSignUpModal = () => {
		setMenuOpen(false);
		setIsSignUpModalOpen(false);
	};
	const handleOpenLoginModal = () => {
		setIsLoginModalOpen(true);
		setMenuOpen(false);
	};

	const handleCloseMenu = () => {
		setMenuOpen(false);
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

	const handleSignIn = () => {
		setIsLoginModalOpen(false);
		onSignIn(email, password, rememberMe);
	};

	return (
		<>
			{isSignUpModalOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50'>
					<SignUp handleCloseSignUpModal={handleCloseSignUpModal} />
				</div>
			)}
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
							<ul className='offcanvas-menu__items'>
								<li onClick={handleCloseMenu}>
									<Link href='/product'>Product page</Link>
								</li>
								<li onClick={handleCloseMenu}>
									<Link href='/contact'>Contact</Link>
								</li>
								<li onClick={handleCloseMenu}>
									<Link href='/login'>Login page</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className='offcanvas-menu__bottom'>
						<button className='btn btn--menu'>
							<Link
								onClick={handleCloseMenu}
								href='https://github.com/remcostoeten'
								target='blank'>
								Github
							</Link>
						</button>
						<button className='btn btn--menu whatsapp'>
							<Link
								onClick={handleCloseMenu}
								href='https://github.com/remcostoeten'
								target='https://wa.me/31636590707'>
								Text or call
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
