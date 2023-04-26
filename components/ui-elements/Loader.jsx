import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from 'react-three-fiber';

const LoadingAnimation = () => {
	const canvasRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const canvas = canvasRef.current;

		// Initialize your Three.js scene here

		const animate = () => {
			// Update your scene here
			requestAnimationFrame(animate);
		};

		animate();
	}, []);

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true);
		};

		const handleRouteChangeComplete = () => {
			setIsLoading(false);
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, [router.events]);

	return (
		<div
			className='loader'
			style={{ display: isLoading ? 'block' : 'none' }}>
			<Canvas ref={canvasRef} />
		</div>
	);
};

export default LoadingAnimation;
