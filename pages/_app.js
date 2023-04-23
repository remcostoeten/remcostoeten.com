import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ Component, pageProps }) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
			<ToastContainer />
		</>
	);
}

export default App;
