import { auth, GoogleAuthProvider, signInWithPopup } from '@/utils/firebase';
import { Auth } from '@firebase/auth';

export const signIn = async (email: string, password: string) => {
	let result;
	if (email && password) {
		result = await signInWithEmailAndPassword(auth, email, password);
	} else {
		result = await signInWithPopup(auth, new GoogleAuthProvider());
	}
	return result;
};

export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (error: any) {
		throw new Error((error as Error).message);
	}
};
function signInWithEmailAndPassword(
	auth: Auth,
	email: string,
	password: string,
): any {
	throw new Error('Function not implemented.');
}
