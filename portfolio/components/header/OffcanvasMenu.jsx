import React from 'react';
import styles from './Toggle.module.scss';
import Toggle from './Toggle';
import Header from './Header';
export default function OffcanvasMenu() {
	return (
		<>
			<div className={styles.menu}>
				<h1>test</h1>
			</div>
			<Header />
			<h1 className="text-white">aaaaaa</h1>
		</>
	);
}
