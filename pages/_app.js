import '@/styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';

import Header from '../components/Header/Header';
import LiquidLoader from '../components/ui-elements/loaders/LiquidLoader';
import Loader from '../components/ui-elements/loaders/CubeLoader';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { Triangle } from '../components/ui-elements/loaders/Triangle';

function App({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);

	const handleStart = () => setLoading(true);
	const handleComplete = () => setLoading(false);

	useEffect(() => {
		Router.events.on('routeChangeStart', handleStart);
		Router.events.on('routeChangeComplete', handleComplete);
		Router.events.on('routeChangeError', handleComplete);

		return () => {
			Router.events.off('routeChangeStart', handleStart);
			Router.events.off('routeChangeComplete', handleComplete);
			Router.events.off('routeChangeError', handleComplete);
		};
	}, []);
	return (
		<>
			{loading && <Triangle />}
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default App;
