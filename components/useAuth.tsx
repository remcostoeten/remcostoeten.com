import { useState, useEffect } from 'react';
import { auth } from '../utils/firebase';

export interface AuthData {
	authenticated: boolean;
	loading: boolean;
}

export const useAuth = (): AuthData => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setAuthenticated(true);
			} else {
				setAuthenticated(false);
			}
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return { authenticated, loading };
};
