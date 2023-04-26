import React, { useState, useEffect } from 'react';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '@/components/ui-elements/Loader';
import LoginModalPuppy from '@/components/auth/LoginModalPuppy';
import { useRouter } from 'next/router';
import Sign from '../components/auth/Sign';
import LoginModal from '../components/auth/LoginModal';
import Router from "next/router";
import LoadingSpinner from '../components/LoadingSpinner';

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
	      {loading && <LoadingSpinner />}

			<LoadingAnimation />

			<Header />
			<Component {...pageProps} />
			<ToastContainer />
			{/* <Login /> */}
		</>
	);
}

export default App;
