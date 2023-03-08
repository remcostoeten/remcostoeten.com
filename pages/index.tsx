import React from 'react';
import Image from 'next/image';
import Header from '@/components/header/Header';
import Intro from '@/components/layout/Intro';

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main className='container'>
				<Intro />
			</main>
		</>
	);
};

export default Home;
