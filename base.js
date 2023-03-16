import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

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

export { db };
