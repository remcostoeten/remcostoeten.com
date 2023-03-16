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
	apiKey: 'AIzaSyDaMvYTCKlOHLI8pdheiMGI9xAJ2XFSwXE',
	authDomain: 'remcostoeten-9c477.firebaseapp.com',
	databaseURL:
		'https://remcostoeten-9c477-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'remcostoeten-9c477',
	storageBucket: 'remcostoeten-9c477.appspot.com',
	messagingSenderId: '219575679617',
	appId: '1:219575679617:web:7cc9080c85726f9ea1eb80',
	measurementId: 'G-MR2Z96ZE7H',
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
