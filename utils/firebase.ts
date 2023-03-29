import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';
import { getDatabase } from 'firebase/database';
import { collection, addDoc } from '@firebase/firestore';
import { onSnapshot, query, orderBy } from '@firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider,
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

const signInWithGoogle = async (auth: any): Promise<any> => {
	try {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken;
		const user = result.user;
		return { token, user };
	} catch (error) {
		console.error('Error logging in:', error);
		throw error;
	}
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

const getEvents = (callback: (events: any[]) => void) => {
	const eventsRef = collection(db, 'events');
	const q = query(eventsRef, orderBy('date'));
	const unsubscribe = onSnapshot(q, (querySnapshot) => {
		const events: any[] = [];
		querySnapshot.forEach((doc) => {
			events.push({ ...doc.data(), id: doc.id });
		});
		callback(events);
	});

	return unsubscribe;
};

const addEvent = async (date: Date, name: String, description: String) => {
	try {
		const docRef = await addDoc(collection(db, 'events'), {
			date: date.toISOString(),
			name,
			description,
		});
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
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
	createUserWithEmailAndPassword,
	database,
	getEvents,
	addEvent,
};
