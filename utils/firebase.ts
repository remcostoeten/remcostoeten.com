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
import { Key } from 'react';

const firebaseConfig = {
	apiKey: 'AIzaSyA5k9RbLj4sexsoRb4W1w_8wWggxcZQ2es',
	authDomain: 'task-41e05.firebaseapp.com',
	projectId: 'task-41e05',
	storageBucket: 'task-41e05.appspot.com',
	messagingSenderId: '482137951796',
	appId: '1:482137951796:web:c64e6f41ad5d0e60b28461',
	measurementId: 'G-STSWFTFM63',
};

export interface Message { 
	name: string;
	message: string;
	timestamp: number;
	index: number;
	preview?: string; // Add this line as an optional property
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
			// Sign-out successful.
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
