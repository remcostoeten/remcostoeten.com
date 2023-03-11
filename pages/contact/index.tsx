import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { fb } from '@/firebase';
export async function getServerSideProps(context) {
	const auth = getAuth(firebase);
	const user = auth.currentUser;

	if (!user) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return { props: {} };
}

const PrivatePage = () => {
	const router = useRouter();

	useEffect(() => {
		const auth = getAuth(fb);

		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push('/login');
			}
		});

		return () => unsubscribe();
	}, []);

	return <div>This is a private page.</div>;
};

export default PrivatePage;
