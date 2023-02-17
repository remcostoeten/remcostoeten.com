// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDaMvYTCKlOHLI8pdheiMGI9xAJ2XFSwXE',
	authDomain: 'remcostoeten-9c477.firebaseapp.com',
	projectId: 'remcostoeten-9c477',
	storageBucket: 'remcostoeten-9c477.appspot.com',
	messagingSenderId: '219575679617',
	appId: '1:219575679617:web:7cc9080c85726f9ea1eb80',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = firebaseApp.firestore;
const auth = firebase.auth();

export { auth };
export default db;
