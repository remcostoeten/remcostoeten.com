	import { initializeApp } from '@firebase/app';
	import { getFirestore } from '@firebase/firestore';
	import firebase from 'firebase/compat';

	import {
		getAuth,
		signInWithPopup,
		GoogleAuthProvider,
		signOut,
	} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	const provider = new GoogleAuthProvider();
	const auth = getAuth();

	const singInWithGoogle = () => {
		console.log('signing in with google');
		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;
				console.log('a');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
				console.log(error.code);
				console.log(error);
			});
	};

	const logout = () => {
		console.log('loggin out');
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};

	export {
		db,
		auth,
		singInWithGoogle,
		logout,
		signInWithPopup,
		GoogleAuthProvider,
	};
