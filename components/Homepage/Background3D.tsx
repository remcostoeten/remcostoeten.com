import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
	Color,
	BufferAttribute,
	BufferGeometry,
	PointsMaterial,
	CanvasTexture,
} from 'three';
import { useMemo, useRef, useState } from 'react';
import OrbitControls from './OrbitControls';

const colors = {
	purple: '#1b1030',
	lightred: '#33122e',
};

const createRoundTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;
	const context = canvas.getContext('2d');
	if (context) {
		context.beginPath();
		context.arc(32, 32, 32, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
	}
	return new CanvasTexture(canvas);
};

const Particles = () => {
	const numParticles = 1000;
	const particleSize = 0.1;
	const geometry = useMemo(() => {
		const geom = new BufferGeometry();
		const positions = new Float32Array(numParticles * 3);

		for (let i = 0; i < numParticles * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 10;
		}

		geom.setAttribute('position', new BufferAttribute(positions, 3));
		return geom;
	}, []);

	const material = useMemo(() => {
		return new PointsMaterial({
			size: particleSize,
			map: createRoundTexture(),
			transparent: true,
			opacity: 0.7,
		});
	}, []);

	useFrame(() => {
		const positions = geometry.getAttribute('position') as BufferAttribute;
		const array = positions.array as Float32Array;

		for (let i = 0; i < numParticles * 3; i += 3) {
			const x = array[i];
			const y = array[i + 1];
			const z = array[i + 2];

			array[i] += (Math.random() - 0.5) * 0.01;
			array[i + 1] += (Math.random() - 0.5) * 0.01;
			array[i + 2] += (Math.random() - 0.5) * 0.01;
		}

		positions.needsUpdate = true;
	});

	return <points geometry={geometry} material={material} />;
};

const Background3D = () => {
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}>
			<Canvas
				style={{
					background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.lightred} 100%)`,
				}}
				camera={{ position: [0, 0, 5] }}
				onCreated={({ gl }) => {
					gl.setClearColor(new Color(colors.purple));
				}}>
				<OrbitControls
					enableDamping
					dampingFactor={0.2}
					enableZoom={true}
					enableRotate={true}
					rotateSpeed={-0.5}
				/>
				<Particles />
			</Canvas>
		</div>
	);
};

export default Background3D;
