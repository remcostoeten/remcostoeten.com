import Header from '@/components/header/Header';
import Intro from '@/components/layout/Intro';
import React from 'react';
export default function Home() {
	return (
		<>
			<div className='bg'></div>
			<div className='bg bg2'></div>
			<div className='bg bg3'></div>
			<div className='content'></div>
			<Header />
			<div className='container'>
				<Intro />
			</div>
		</>
	);
}
