import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import Particles from 'react-particles-js';

const VoidBackground = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

	useEffect(() => {
		const container = containerRef.current;

		// Set up the scene
		const scene = new THREE.Scene();

		// Add a particle system
		const particleSystem = new Particles({
			// Configure the particle system here
		});
		scene.add(particleSystem as THREE.Object3D);

		// Add a camera
		const camera = new THREE.PerspectiveCamera(
			75, // Field of view
			window.innerWidth / window.innerHeight, // Aspect ratio
			0.1, // Near clipping plane
			1000, // Far clipping plane
		);
		camera.position.z = 50;
		cameraRef.current = camera;
		scene.add(camera);

		// Add a renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		container?.appendChild(renderer.domElement);

		// Set the background color to black
		renderer.setClearColor(0x000000);

		// Handle window resizing
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};
		window.addEventListener('resize', handleResize);

		// Animate the scene
		const animate = () => {
			requestAnimationFrame(animate);
			if (particleSystem) {
				particleSystem.rotation.y += 0.001; // Rotate the particle system
			}
			renderer.render(scene, cameraRef.current!);
		};
		animate();

		// Handle mouse movement
		const handleMouseMove = (event: MouseEvent) => {
			const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
			if (cameraRef.current) {
				cameraRef.current.rotation.x = mouseY * 0.1; // Adjust the camera rotation based on mouse movement
				cameraRef.current.rotation.y = mouseX * 0.1;
			}
		};
		container?.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('resize', handleResize);
			container?.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return <div ref={containerRef} />;
};

export default VoidBackground;
