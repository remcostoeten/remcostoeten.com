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
import { updateProfile } from '@firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAXRo1qIp4lwuTyXui-iLlaJ1yIuWMJyGs',
	authDomain: 'remcostoeten-fresh.firebaseapp.com',
	projectId: 'remcostoeten-fresh',
	storageBucket: 'remcostoeten-fresh.appspot.com',
	messagingSenderId: '597496221737',
	appId: '1:597496221737:web:dffc49d781cb5c53840c38',
	measurementId: 'G-LB8SZXST3B',
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

const signUp = async (name, email, password) => {
	try {
		const auth = getAuth();
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		const user = userCredential.user;

		// Update the user's display name
		await updateProfile(user, {
			displayName: name,
		});

		console.log(user);
	} catch (error) {
		console.log(error);
	}
};
// sign in with email and password
const signIn = async (email, password) => {
	try {
		const auth = getAuth(); // get the auth instance
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password,
		); // sign in user
		const user = userCredential.user;
		console.log(user);
	} catch (error) {
		console.log(error);
	}
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
