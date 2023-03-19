import { auth } from '@/firebase';
import React, { useEffect, useState } from 'react';

export default function isLoggedInLogic() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState<string | null>(null);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserName(user.displayName);
			} else {
				setIsLoggedIn(false);
				setUserName(null);
			}
		});
	}, []);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setIsLoggedIn(Boolean(user));
		});
	}, []);

	return <div>isLoggedInLogic</div>;
}
