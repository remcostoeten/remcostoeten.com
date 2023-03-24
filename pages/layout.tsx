<<<<<<< HEAD
=======
// import Header from '@/components/Header/Header';
>>>>>>> 7a060e679127262a329e49820e4db5e2e863dbb0
import Intro from '@/components/layout/Intro';
import React from 'react';
export default function Home() {
	return (
		<div className='area'>
			<ul className='circles'>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
				<div className='dots'></div>
			</ul>
			{/* <Header /> */}
			<div className='container'>
				<Intro />
			</div>
		</div>
	);
}
