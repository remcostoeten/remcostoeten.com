import React, { useState } from 'react';
import OffcanvasMenu from '@/components/header/OffcanvasMenu';
import styles from './Header..scss';

export default function npm() {
	const [menuOpen, setMenuOpen] = useState(false);

	const handleCloseMenu = () => {
		setMenuOpen(false);
	};

	return (
		<>
			{/* This header class should be optional, if you choose to not use the header layout you should only get <OFfcanvasMenu/>> */}
			<Header clasName={styles}>
				{' '}
				/
				<OffcanvasMenu />
			</Header>{' '}
		</>
	);
}
