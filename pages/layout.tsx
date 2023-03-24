<<<<<<< HEAD
// import Header from '@/components/Header/Header';
=======
>>>>>>> task
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
