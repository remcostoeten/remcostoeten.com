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
const {
	publicRuntimeConfig: { localEnv },
} = getConfig();
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const firebaseConfig = {
	apiKey: process.env.FB_API,
	authDomain: process.env.FB_AUTH_DOMAIN,
	projectId: process.env.FB_PROJECT_ID,
	storageBucket: process.env.FB_STORAGE_BUCKET,
	messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
	appId: process.env.FB_APP_ID,
	measurementId: process.env.FB_MEASUREMENT_ID,
	databaseURL: `https://${process.env.FB_PROJECT_ID}.firebaseio.com`, // Add this line
};

export interface Message {
	name: string;
	message: string;
	timestamp: number;
	index: number;
	preview?: string;
}

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
			// An error happened.
		});
};

const getChatHistory1 = async (): Promise<Message[] | null> => {
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

const getChatHistory2 = async (): Promise<Message[] | null> => {
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

const getChatHistory3 = async (): Promise<Message[] | null> => {
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
