import React, { useRef, useEffect } from 'react';
import p5, { Vector } from 'p5';

interface Particle {
	pos: Vector;
	vel: Vector;
	size: number;
}

const ParticleBackground: React.FC = () => {
	const canvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.body.classList.add('particles');
	}, []);

	useEffect(() => {
		const particles: Particle[] = [];
		let mouseX = 0;
		let mouseY = 0;

		const sketch = (p: p5) => {
			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight);
				p.frameRate(30); // Set frame rate limit to 30 FPS
				for (let i = 0; i < 30; i++) {
					// Reduce the number of particles
					particles.push({
						pos: p.createVector(
							p.random(p.width),
							p.random(p.height),
						),
						vel: p.createVector(p.random(-1, 1), p.random(-1, 1)),
						size: p.random(1, 3), // Reduce the size of the particles
					});
				}
			};

			p.draw = () => {
				p.clear();
				p.background('#1b1030'); // Use a solid background color instead of a gradient

				const skewX = p.map(mouseX, 0, p.width, -0.1, 0.1);
				const skewY = p.map(mouseY, 0, p.height, -0.1, 0.1);
				p.applyMatrix(1, skewY, skewX, 1, 0, 0);

				for (const particle of particles) {
					particle.pos.add(particle.vel);
					checkEdges(particle, p);

					p.stroke(255);
					p.strokeWeight(particle.size);
					p.point(particle.pos.x, particle.pos.y);
				}

				// Orb light ball following the mouse
				const orbSize = 20;
				p.noStroke();
				p.fill(255, 150, 0, 150);
				p.ellipse(mouseX, mouseY, orbSize, orbSize);
			};

			p.mouseMoved = () => {
				mouseX = p.mouseX;
				mouseY = p.mouseY;
			};
		};

		const checkEdges = (particle: Particle, p: p5) => {
			if (particle.pos.x < 0 || particle.pos.x > p.width) {
				particle.vel.x *= -1;
			}

			if (particle.pos.y < 0 || particle.pos.y > p.height) {
				particle.vel.y *= -1;
			}
		};

		if (canvasRef.current) {
			new p5(sketch, canvasRef.current);
		}

		return () => {
			// Clean up p5 instance on unmount
			if (canvasRef.current) {
				canvasRef.current.removeChild(canvasRef.current.childNodes[0]);
			}
		};
	}, []);

	return <div ref={canvasRef} />;
};

export default ParticleBackground;
