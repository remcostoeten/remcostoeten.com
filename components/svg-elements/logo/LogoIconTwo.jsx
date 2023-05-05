import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader, useFrame } from '@react-three/fiber';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const AnimatedSVG = () => {
	const { paths } = useLoader(SVGLoader, '/path-to-your-svg-file.svg');
	const shapes = React.useMemo(
		() => paths.flatMap((path) => path.toShapes(true)),
		[paths],
	);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		const rotation = Math.sin(elapsedTime) * 0.01;
		for (const mesh of meshes.current) {
			mesh.rotation.x += rotation;
			mesh.rotation.y += rotation;
		}
	});

	const meshes = React.useRef([]);

	return (
		<group scale={0.1}>
			{shapes.map((shape, index) => (
				<mesh
					key={index}
					ref={(mesh) => meshes.current.push(mesh)}
					rotation={[0, 0, 0]}
					position={[0, 0, index * 0.01]}
					geometry={new THREE.ShapeGeometry(shape)}>
					<meshStandardMaterial color='#fff' />
				</mesh>
			))}
		</group>
	);
};

const LogoIcon = (props) => (
	<div className='logo' style={{ width: '210px', height: '46px' }}>
		<Canvas orthographic camera={{ zoom: 200, position: [0, 0, 100] }}>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			<AnimatedSVG />
		</Canvas>
	</div>
);

export default LogoIcon;
