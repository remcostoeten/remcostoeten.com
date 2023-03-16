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
	apiKey: 'AIzaSyBfhtHl3y6KE4N6EFeBskDnEgirKzd6jr0',
	authDomain: 'remcostoeten-auth-database.firebaseapp.com',
	projectId: 'remcostoeten-auth-database',
	storageBucket: 'remcostoeten-auth-database.appspot.com',
	messagingSenderId: '9004316576',
	appId: '1:9004316576:web:23ab65d1969d436e0cd6c5',
	measurementId: 'G-J91KKF6LF1',
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
