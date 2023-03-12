import fb from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from 'firebase/auth';

const firebaseApp = fb.initializeApp({
	apiKey: 'AIzaSyDaMvYTCKlOHLI8pdheiMGI9xAJ2XFSwXE',
	authDomain: 'remcostoeten-9c477.firebaseapp.com',
	projectId: 'remcostoeten-9c477',
	storageBucket: 'remcostoeten-9c477.appspot.com',
	messagingSenderId: '219575679617',
	appId: '1:219575679617:web:7cc9080c85726f9ea1eb80',
});

if (!firebaseApp) {
	firebase = fb.initializeApp({
		apiKey: 'AIzaSyDaMvYTCKlOHLI8pdheiMGI9xAJ2XFSwXE',
		authDomain: 'remcostoeten-9c477.firebaseapp.com',
		projectId: 'remcostoeten-9c477',
		storageBucket: 'remcostoeten-9c477.appspot.com',
		messagingSenderId: '219575679617',
		appId: '1:219575679617:web:7cc9080c85726f9ea1eb80',
	});
	console.log('!firebase');
}

const db = firebaseApp.firestore();
const storage = fb.storage();

const provider = new GoogleAuthProvider();
const auth = getAuth();

const singInWithGoogle = () => {
	console.log('signing in with google');
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
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
	storage,
	fb,
	singInWithGoogle,
	logout,
	signInWithPopup,
	GoogleAuthProvider,
};
