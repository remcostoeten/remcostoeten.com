//Core
import React from 'react';
import styles from './HamburgerMenu.module.scss';
import Hamburger from './Hamburger';
import Menu from '../Menu';

class HamburgerMenu extends React.Component {
	state = {
		isOpen: false,
	};

	handleClick = () => {
		console.log('Abc');
		this.setState({
			isOpen: !this.state.isOpen,
		});
	};

	render() {
		return (
			<>
				<div className='mobile'>
					<Hamburger
						onClick={this.handleClick}
						className={
							this.state.isOpen
								? `${styles.hamburger} ${styles.hamburgeractive}`
								: styles.hamburger
						}
					/>
					<Menu
						className={
							this.state.isOpen
								? `${styles.navigation} ${styles.navigationactive}`
								: styles.navigation
						}
					/>
				</div>
			</>
		);
	}
}

export default HamburgerMenu;
