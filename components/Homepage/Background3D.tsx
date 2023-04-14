import { Canvas, useFrame } from '@react-three/fiber';
import {
	BufferAttribute,
	BufferGeometry,
	PointsMaterial,
	CanvasTexture,
	Color,
	ColorRepresentation,
} from 'three';
import { useMemo, useState, useCallback } from 'react';
import OrbitControls from './OrbitControls';

const colors: { [key: string]: ColorRepresentation } = {
	purple: '#1b1030',
	lightred: '#33122e',
};

const createRoundTexture = (): CanvasTexture => {
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

type ParticlesProps = {
	opacity: number;
};

const Particles = ({ opacity }: ParticlesProps): JSX.Element => {
	const numParticles = 500;

	const geometry = useMemo(() => {
		const geom = new BufferGeometry();
		const positions = new Float32Array(numParticles * 3);
		const sizes = new Float32Array(numParticles);

		for (let i = 0; i < numParticles * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 10;
		}

		for (let i = 0; i < numParticles; i++) {
			sizes[i] = Math.random() * 0.15;
		}

		geom.setAttribute('position', new BufferAttribute(positions, 3));
		geom.setAttribute('size', new BufferAttribute(sizes, 1));
		return geom;
	}, []);

	const material = useMemo(() => {
		return new PointsMaterial({
			size: 0.1,
			map: createRoundTexture(),
			transparent: true,
			opacity: opacity,
			sizeAttenuation: true,
		});
	}, [opacity]);

	useFrame(() => {
		const positions = geometry.getAttribute('position') as BufferAttribute;
		const array = positions.array as Float32Array;

		for (let i = 0; i < numParticles * 3; i += 3) {
			array[i] += (Math.random() - 0.5) * 0.005;
			array[i + 1] += (Math.random() - 0.5) * 0.005;
			array[i + 2] += (Math.random() - 0.5) * 0.005;
		}
		positions.needsUpdate = true;
	});

	return (
		<points>
			<bufferGeometry attach='geometry' {...geometry} />
			<pointsMaterial attach='material' {...material} />
		</points>
	);
};

const Background3D = (): JSX.Element => {
	const [opacity, setOpacity] = useState(0.7);

	const handleMouseMove = useCallback((e: { clientX: number }) => {
		const opacity = e.clientX / window.innerWidth;
		setOpacity(opacity);
	}, []);
	return (
		<div
			style={{
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
				}}
				onMouseMove={handleMouseMove}>
				<OrbitControls
					enableDamping
					dampingFactor={0.1}
					enableZoom={false}
					enableRotate={true}
					rotateSpeed={-0.5}
				/>
				<Particles opacity={opacity} />
			</Canvas>
		</div>
	);
};

export default Background3D;
