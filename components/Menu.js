//Core
import React from 'react';
import styles from './HamburgerMenu/HamburgerMenu.module.scss';

const Menu = ({ className }) => (
	<div className={className}>
		Temporary menu.
		<ul className={styles.navigation__list}>
			<li className={styles.navigation__item}>
				<a href='https://remcostoeten-multistepform.netlify.app/'>
					Frontendmentor multistrepform in react
				</a>{' '}
			</li>
			<li className={styles.navigation__item}>
				<a href='https://funny-elf-e20c8d.netlify.app//'>
					Frontendmentor chat case in vanillaJS + HTML/SCSS
				</a>{' '}
			</li>
		</ul>
	</div>
);

export default Menu;
