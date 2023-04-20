import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getDatabase } from '@firebase/database';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from '@firebase/auth';
import { getDownloadURL, ref } from '@firebase/storage';
import getConfig from 'next/config';
const {} = getConfig();
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const signInWithGoogle = () => {
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
	console.log('logging out');
	signOut(auth)
		.then(() => {
			toast.success('Successfully logged out');
		})
		.catch((error) => {
			console.log(error.message + 'Erorr while logging out');
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
	database,
};
