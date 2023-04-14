import MouseFollower from '@/components/Homepage/MouseFollower';
import HeaderNew from '@/components/header/HeaderNew';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import GradientScene from '@/components/Homepage/Background3D';
import ThreeJSScene from '@/components/Homepage/Background3D';
import Background3D from '@/components/Homepage/Background3D';
const ParticleBackground = dynamic(
	() => import('@/components/Homepage/ParticleBackground'),
	{ ssr: false },
);

const Home: NextPage = () => {
	return (
		<>
			<HeaderNew />
			{/* <Background3D /> */}
			{/* <MouseFollower /> */}
			{/* <ParticleBackground /> */}
		</>
	);
};

export default Home;
