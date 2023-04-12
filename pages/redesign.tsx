// pages/index.tsx
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ParticleBackground = dynamic(
	() => import('@/components/Homepage/ParticleBackground'),
	{ ssr: false },
);

const Home: NextPage = () => {
	return (
		<>
			<ParticleBackground />
			{/* Other components and content */}
		</>
	);
};

export default Home;
