import SvgBlobs from '@/components/Homepage/SvgBlobs';
import { useEffect, useState, MouseEventHandler } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export default function Menu(): JSX.Element {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [rotateX, setRotateX] = useState<number>(-20);
	const [rotateY, setRotateY] = useState<number>(45);

	useEffect(() => {
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

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
		const intensity = 40; // adjust this to control the intensity of the effect
		const mouseX = event.pageX;
		const mouseY = event.pageY;
		const menuContainer = document.querySelector(
			'.menu-container',
		) as HTMLElement;
		const menuContainerRect = menuContainer.getBoundingClientRect();
		const svgLeft = document.querySelector('.yellow-blob') as HTMLElement;
		const svgLeftRect = svgLeft.getBoundingClientRect();
		const svgRight = document.querySelector('.blob2') as HTMLElement;
		const svgRightRect = svgRight.getBoundingClientRect();
		const isInsideMenuContainer =
			mouseX >= menuContainerRect.left &&
			mouseX <= menuContainerRect.right &&
			mouseY >= menuContainerRect.top &&
			mouseY <= menuContainerRect.bottom;
		const isInsideSvgLeft =
			mouseX >= svgLeftRect.left &&
			mouseX <= svgLeftRect.right &&
			mouseY >= svgLeftRect.top &&
			mouseY <= svgLeftRect.bottom;
		const isInsideSvgRight =
			mouseX >= svgRightRect.left &&
			mouseX <= svgRightRect.right &&
			mouseY >= svgRightRect.top &&
			mouseY <= svgRightRect.bottom;
		if (!isInsideMenuContainer && !isInsideSvgLeft && !isInsideSvgRight) {
			const newX = -(mouseX / window.innerWidth - 0.5) * intensity;
			const newY = (mouseY / window.innerHeight - 0.5) * intensity;
			const body = document.querySelector('body') as HTMLElement;
			if (body) {
				body.style.transform = `rotateX(${newY}deg) rotateY(${newX}deg)`;
			}
		}
	};

	function toggleMenu(e: React.MouseEvent<HTMLAnchorElement>) {
		setIsMenuOpen(!isMenuOpen);
		e.preventDefault();
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
					<br /> &amp; Just like you, i don't knoww.
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
