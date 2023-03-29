import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { auth } from '@/utils/firebase';
import firebase from 'firebase/app';
import { User } from 'firebase/auth';
import 'firebase/auth';

interface AuthContextProps {
	user: User | null;
}

const AuthContext = createContext<AuthContextProps>({ user: null });

export const useAuth = () => {
	return useContext(AuthContext);
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});

		return () => unsubscribe();
	}, []);

	const value: AuthContextProps = {
		user,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
