import React, { useRef, useEffect } from 'react';
import {
	BoxGeometry,
	Mesh,
	MeshNormalMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from 'three';
import Link from 'next/link';

export default function CustomError({ statusCode }) {
	const canvasRef = useRef(null);

	useEffect(() => {
		const scene = new Scene();
		const camera = new PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new WebGLRenderer({
			canvas: canvasRef.current,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		const geometry = new BoxGeometry(2, 2, 2);
		const material = new MeshNormalMaterial();
		const mesh = new Mesh(geometry, material);
		scene.add(mesh);
		camera.position.z = 5;
		const animate = () => {
			requestAnimationFrame(animate);
			mesh.rotation.x += 0.01;
			mesh.rotation.y += 0.01;
			renderer.render(scene, camera);
		};
		animate();
		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};
		window.addEventListener('resize', handleResize);
		return () => {
			scene.remove(mesh);
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<canvas className='canvas' ref={canvasRef} />
			<div className='container'>
				<div className='card'>
					<div className='card__face'>
						<h1>{statusCode}</h1>
						<p>Error</p>
						<Link href='/'>
							<a>Go Back Home</a>
						</Link>
					</div>
					<div className={`card__face card__face_back`}>
						<p>Oops! An error occurred.</p>
					</div>
				</div>
			</div>
		</>
	);
}

CustomError.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};
