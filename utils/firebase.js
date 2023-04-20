import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage, ref, getDownloadURL } from '@firebase/storage';
import { getDatabase } from '@firebase/database';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from '@firebase/auth';
import getConfig from 'next/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { publicRuntimeConfig } = getConfig();

const firebaseConfig = {
	apiKey: publicRuntimeConfig.FB_API,
	authDomain: publicRuntimeConfig.FB_AUTH_DOMAIN,
	projectId: publicRuntimeConfig.FB_PROJECT_ID,
	storageBucket: publicRuntimeConfig.FB_STORAGE_BUCKET,
	messagingSenderId: publicRuntimeConfig.FB_MESSAGING_SENDER_ID,
	appId: publicRuntimeConfig.FB_APP_ID,
	measurementId: publicRuntimeConfig.FB_MEASUREMENT_ID,
	databaseURL: `https://${publicRuntimeConfig.FB_PROJECT_ID}.firebaseio.com`,
};

export const db = getFirestore(initializeApp(firebaseConfig));
export const storage = getStorage(initializeApp(firebaseConfig));
export const database = getDatabase(initializeApp(firebaseConfig));
export const auth = getAuth(initializeApp(firebaseConfig));
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
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

export const logout = () => {
	console.log('logging out');
	signOut(auth)
		.then(() => {
			toast.success('Successfully logged out');
		})
		.catch((error) => {
			// An error happened.
		});
};

export const getChatHistory1 = async () => {
	try {
		const chatHistoryRef = ref(storage, 'y.json');
		const url = await getDownloadURL(chatHistoryRef);
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching chat history:', error);
		return null;
	}
};

export const getChatHistory2 = async () => {
	try {
		const chatHistoryRef = ref(storage, 'zold.json');
		const url = await getDownloadURL(chatHistoryRef);
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching chat history:', error);
		return null;
	}
};

export const getChatHistory3 = async () => {
	try {
		const chatHistoryRef = ref(storage, 'znew.json');
		const url = await getDownloadURL(chatHistoryRef);
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching chat history:', error);
		return null;
	}
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
	getChatHistory1,
	getChatHistory2,
	getChatHistory3,
};
