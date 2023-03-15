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
	apiKey: 'AIzaSyB2tLKvc95MRm1VXNPzLbDt-yevSoyOQbU',
	authDomain: 'remcostoeten-dev-60bbc.firebaseapp.com',
	databaseURL:
		'https://remcostoeten-dev-60bbc-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'remcostoeten-dev-60bbc',
	storageBucket: 'remcostoeten-dev-60bbc.appspot.com',
	messagingSenderId: '587234212127',
	appId: '1:587234212127:web:2524077b122b8aa4bad82a',
	measurementId: 'G-TL2990YLCG',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

const singInWithGoogle = () => {
	console.log('signing in with google');
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			// The signed-in user info.
			const user = result.user;
			console.log('a');
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
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
