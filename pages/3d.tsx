import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mesh, BufferGeometry, MeshStandardMaterial } from 'three';

import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import Toggle from '@/components/header/Toggle';
const Sphere: React.FC = () => {
	const meshRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial> | null>(
		null,
	);
	const [hovered, setHover] = useState(false);

	return (
		<mesh
			ref={meshRef}
			onPointerOver={() => setHover(true)}
			onPointerOut={() => setHover(false)}>
			<sphereBufferGeometry args={[1, 16, 16]} />
			<MeshWobbleMaterial
				color={hovered ? 'hotpink' : 'blue'}
				speed={1}
				factor={1}
			/>
		</mesh>
	);
};

const AnimatedBackground: React.FC = () => {
	return (
		<>
			<Toggle />
			<div style={{ width: '100vw', height: '100vh' }}>
				<Canvas>
					<color attach='background' args={['#272727']} />
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} />
					<Sphere />
					<OrbitControls />
				</Canvas>
			</div>
		</>
	);
};

export default AnimatedBackground;
