import { useEffect, useState } from 'react';
import '@/styles/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header/Header';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { InfiniteLoader } from '../components/ui-elements/loaders/Infinite';
import WarningMessage from '../components/ui-elements/MessageWip';
import SpeedDial from '../components/ui-elements/Speeddial';
import Head from 'next/head';

function App({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	const handleStart = () => setLoading(true);
	const handleComplete = () => setLoading(false);

	useEffect(() => {
		document.body.classList.add('wrapper');
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
			<Head>
				<title>
					Remcostoeten - Remco Stoeten, a front-end
					developer=/divjesschuiver.
				</title>
				<meta
					name='description'
					content='Remco Stoeten, front-end developer with six years experience aspiring to be more than just a so called "divjesschuiver".'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
			</Head>
			{loading && <InfiniteLoader />}
			<Header />
			<main className='wrapper__content'>
				<Component {...pageProps} />
			</main>
			<WarningMessage />
			<ToastContainer />
			<SpeedDial />
		</>
	);
}

export default App;
