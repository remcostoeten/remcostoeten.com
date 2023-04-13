import { useEffect, useRef } from 'react';
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
		let canvas: p5.Renderer | null = null;

		const sketch = (p: p5) => {
			p.setup = () => {
				if (canvasRef.current) {
					canvas = p.createCanvas(p.windowWidth, p.windowHeight);
					canvas.parent(canvasRef.current);
					p.frameRate(30);
					for (let i = 0; i < 30; i++) {
						particles.push({
							pos: p.createVector(
								p.random(p.width),
								p.random(p.height),
							),
							vel: p.createVector(
								p.random(-1, 1),
								p.random(-1, 1),
							),
							size: p.random(1, 3),
						});
					}
				}
			};

			p.draw = () => {
				p.clear(0, 0, p.width, p.height); // pass arguments to clear method
				const gradient = p.drawingContext.createLinearGradient(
					0,
					0,
					0,
					p.height,
				);
				gradient.addColorStop(0, '#1b1030');
				gradient.addColorStop(1, '#572733');
				p.drawingContext.fillStyle = gradient;
				p.drawingContext.fillRect(0, 0, p.width, p.height);

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

				const orbSize = 20;
				p.noStroke();
				p.fill(255, 150, 0, 150);
				p.ellipse(mouseX, mouseY, orbSize, orbSize);
			};

			p.mouseMoved = () => {
				mouseX = p.mouseX;
				mouseY = p.mouseY;
				p.redraw();
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
			new p5(sketch);
		}

		return () => {
			if (canvas) {
				canvas.remove();
			}
		};
	}, []);

	return (
		<div className='particle-container' ref={canvasRef}>
			<h1>Welcome to my website</h1>
			<p>This is some text</p>
		</div>
	);
};

export default ParticleBackground;
