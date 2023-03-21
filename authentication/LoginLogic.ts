import {
	auth,
	GoogleAuthProvider,
	signInWithPopup,
} from '../authentication/firebase';

export const signIn = async () => {
	try {
		const result = await signInWithPopup(auth, new GoogleAuthProvider());
		return result.user;
	} catch (error: any) {
		throw new Error((error as Error).message);
	}
};

export const signOut = async () => {
	try {
		await auth.signOut();
	} catch (error: any) {
		throw new Error((error as Error).message);
	}
};
