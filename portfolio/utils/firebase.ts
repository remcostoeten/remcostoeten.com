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
	apiKey: "AIzaSyCZdnGJtM7rxzk7y7Ga1vKvGoHv8ja23e4",
	authDomain: "personal-panel---chat.firebaseapp.com",
	projectId: "personal-panel---chat",
	storageBucket: "personal-panel---chat.appspot.com",
	messagingSenderId: "534740783847",
	appId: "1:534740783847:web:2ba1ee44119c4d862a4842"
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
			console.log(user, 'succesfully signed in.' + token);
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
