import { useEffect, useState } from 'react';

import '@/styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header/Header';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { InfiniteLoader } from '../components/ui-elements/loaders/Infinite';
import { WarningMessage } from '../components/ui-elements/MessageWip';
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
			<WarningMessage />
			{loading && <InfiniteLoader />}
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default App;
