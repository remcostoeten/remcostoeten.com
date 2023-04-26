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
import Login from '../components/ui-elements/authentication/Login';
import SignInPuppy from '../components/auth/LoginModalPuppy';

function App({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<>
			<LoadingAnimation />

			<Header />
			<Component {...pageProps} />
			<ToastContainer />
			{/* <Login /> */}
		</>
	);
}

export default App;
