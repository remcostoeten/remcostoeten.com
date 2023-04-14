
import React, { useState, useEffect } from 'react';
import { Orb, Particle } from './StyledOrb';

interface Position {
	x: number;
	y: number;
}

const generateRandomParticles = (count: number) => {
	const particles: Position[] = [];

	for (let i = 0; i < count; i++) {
		particles.push({
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
		});
	}

	return particles;
};

const MouseFollower: React.FC = () => {
	const [orbPosition, setOrbPosition] = useState<Position>({ x: 0, y: 0 });
	const [particles, setParticles] = useState<Position[]>([]);

	useEffect(() => {
		setParticles(generateRandomParticles(50));
	}, []);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setOrbPosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<>
			<Orb style={{ left: orbPosition.x, top: orbPosition.y }} />
			{particles.map((particle, index) => (
				<Particle
					key={index}
					style={{ left: particle.x, top: particle.y }}
				/>
			))}
		</>
	);
};

export default MouseFollower;
