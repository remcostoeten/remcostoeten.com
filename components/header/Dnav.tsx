import Link from 'next/link';
import React from 'react';

function Dnav() {
	return (
		<>
			<nav className='chat-nav'>
				<Link href='Dtot100k'>0 - 100k</Link>
				<Link href='Dtot200k'>100 - 200</Link>
				<Link href='Dtot400k'>200 - 300k</Link>
				<Link href='Dtot300k'>300 - 400k</Link>
			</nav>
		</>
	);
}

export default Dnav;
