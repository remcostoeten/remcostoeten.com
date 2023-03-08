<<<<<<< HEAD
import Header from '@/components/header/Header';
import Intro from '@/components/layout/Intro';
import React from 'react';
export default function ssssssssss() {
	return (
		<div>
			<Header />
			<Intro />
		</div>
	);
}
=======
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
>>>>>>> 8f69aaa9647fd94716beeeccf0e88302388f9013
