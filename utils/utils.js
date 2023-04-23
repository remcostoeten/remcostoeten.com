import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const withAuth = (Component) => {
	const AuthenticatedComponent = (props) => {
		const { data: session, status } = useSession();
		const router = useRouter();

		if (status === 'loading') {
			return <div>Loading...</div>;
		}

		if (!session) {
			router.push('/signin');
			return null;
		}

		return <Component {...props} />;
	};

	if (Component.getInitialProps) {
		AuthenticatedComponent.getInitialProps = Component.getInitialProps;
	}

	return AuthenticatedComponent;
};

export default withAuth;
