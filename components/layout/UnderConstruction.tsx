import React, { useState } from 'react';
import Hamburger from 'hamburger-react';

export default function underConstruction() {
	const [isOpen, setOpen] = useState(false);
	return (
		<>
			<Hamburger toggled={isOpen} toggle={setOpen} />
			{/* <div className='notice'>Site under construction. </div> */}
		</>
	);
}
