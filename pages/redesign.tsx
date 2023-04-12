// pages/index.tsx
import HeaderNew from '@/components/header/HeaderNew';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(
	() => import('@/components/Homepage/ParticleBackground'),
	{ ssr: false },
);


const Home: NextPage = () => {
	return (
		<>
			<HeaderNew />
			<ParticleBackground />
		</>
	);
};

export default Home;
