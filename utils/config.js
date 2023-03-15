import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyB2tLKvc95MRm1VXNPzLbDt-yevSoyOQbU',
	authDomain: 'remcostoeten-dev-60bbc.firebaseapp.com',
	databaseURL:
		'https://remcostoeten-dev-60bbc-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'remcostoeten-dev-60bbc',
	storageBucket: 'remcostoeten-dev-60bbc.appspot.com',
	messagingSenderId: '587234212127',
	appId: '1:587234212127:web:2524077b122b8aa4bad82a',
	measurementId: 'G-TL2990YLCG',
};

// Initialize Firebase
let firebase_app =
	getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
