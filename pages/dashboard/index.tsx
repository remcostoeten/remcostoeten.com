import Login from '@/components/dashboard/Login/Login';
import { auth } from '@/utils/firebase';
import { Dashboard } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setIsLoggedIn(!!user);
		});

		return unsubscribe;
	}, []);

	return isLoggedIn ? <Dashboard /> : <Login />;
}
