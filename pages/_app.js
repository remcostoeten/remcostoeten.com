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
	const [version, setVersion] = useState(233); 
	const [showTimer, setShowTimer] = useState(true); 
	const handleStart = () => setLoading(true);
	const handleComplete = () => setLoading(false);

	useEffect(() => {
		document.body.classList.add('wrapper');
		Router.events.on('routeChangeStart', handleStart);
		Router.events.on('routeChangeComplete', handleComplete);
		Router.events.on('routeChangeError', handleComplete);

		const intervalId = setInterval(() => {
			setVersion((prevVersion) => prevVersion + 1);
		}, 2000);

		setTimeout(() => {
			showTimer && setShowTimer(false);
		}, 25000);

		return () => {
			Router.events.off('routeChangeStart', handleStart);
			Router.events.off('routeChangeComplete', handleComplete);
			Router.events.off('routeChangeError', handleComplete);

			clearInterval();
		};
	}, []);

	return (
		<>
			<Head>
				<title>Hello i am remco from ...🔥</title>
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
			{version !== null &&  showTimer && (
				<div className='fixed bottom-4 right-4 z-50'>
					<div className='bg-white text-xs dark:bg-black rounded		
					text-slate-600 p-2'>
						Design version{' '}
						<span className='inline-block font-medium bg-indigo-200 dark:bg-gray-900 rounded-md px-2 py-1 animate-fade-in'>
							{version}
						</span>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
