import React, { useState, useEffect } from 'react';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '@/components/ui-elements/Loader';
import LoginModalPuppy from '@/components/auth/LoginModalPuppy';
import { useRouter } from 'next/router';

import Router from 'next/router';
import LoadingSpinner from '../components/LoadingSpinner';
import Loader from '../components/ui-elements/Loader';

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
			{loading && <Loader />}
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default App;
