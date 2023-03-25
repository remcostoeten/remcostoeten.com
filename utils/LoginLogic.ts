import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, GoogleAuthProvider, signInWithPopup } from '../utils/firebase';

export const signIn = async (
	setIsLoggedIn: (value: boolean) => void,
	email?: string,
	password?: string,
) => {
	try {
		let result;
		if (email && password) {
			result = await signInWithEmailAndPassword(auth, email, password);
		} else {
			result = await signInWithPopup(auth, new GoogleAuthProvider());
		}
		setIsLoggedIn(true);
	} catch (error) {
		console.log(error);
	}
};
export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (error: any) {
		throw new Error((error as Error).message);
	}
};
