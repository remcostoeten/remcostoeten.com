import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, SessionProvider } from 'next-auth/react';

function App({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<div className='page'>
				<Header />
				<main className='page__inner'>
					<SessionCheck>
						<Component {...pageProps} />
					</SessionCheck>
				</main>
				<ToastContainer />
			</div>
		</SessionProvider>
	);
}

function SessionCheck({ children }) {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	return children;
}

export default App;
