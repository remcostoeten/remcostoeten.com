import MouseFollower from '@/components/Homepage/MouseFollower';
import CameraPan from '@/components/Homepage/CameraPan';
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
			{/* <MouseFollower /> */}
			{/* <CameraPan /> */}
			{/* <ParticleBackground /> */}
		</>
	);
};

export default Home;
