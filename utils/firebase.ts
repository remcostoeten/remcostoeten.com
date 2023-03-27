import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDwXDGrvrAS7Z3KwdpeOqVFJva32rT_qCc',
	authDomain: 'remcostoeten-9cadf.firebaseapp.com',
	projectId: 'remcostoeten-9cadf',
	storageBucket: 'remcostoeten-9cadf.appspot.com',
	messagingSenderId: '97706826008',
	appId: '1:97706826008:web:0a631d6aee76daf875e66d',
	measurementId: 'G-BTR9DC1LPH',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const signInWithGoogle = (): Promise<void> => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider).then((result) => {
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;
		const user = result.user;
		console.log('a');
	});
};
const logout = () => {
	console.log('logging out');
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
	signInWithGoogle,
	logout,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	database,
	signInWithEmailAndPassword,
};
