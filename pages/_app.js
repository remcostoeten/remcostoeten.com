import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LottieLoader from '../components/ui-elements/LottieLoader';

function App({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChangeStart = () => {
			setIsLoading(true);
		};
		const handleRouteChangeComplete = () => {
			setIsLoading(false);
		};

		// Listen for route changes to show and hide the loader
		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);

		// Cleanup listeners
		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, []);

	return (
		<>
			<ToastContainer />
			<Header />
			{isLoading ? <LottieLoader /> : <Component {...pageProps} />}
		</>
	);
}

export default App;
