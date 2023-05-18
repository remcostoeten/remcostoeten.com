import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/header/Header';
import '@/styles/styles.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';

import React, { useState, useEffect } from 'react';
2;
function app({ Component, pageProps }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
		});

		return () => unsubscribe();
	}, []);
	return (
		<>
			<CustomCursor />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default app;
