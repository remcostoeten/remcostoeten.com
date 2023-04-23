import { getProviders, signIn as _signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ providers }) {
	const router = useRouter();

	const signIn = (provider) => {
		_signIn(provider.id, { callbackUrl: router.query.callbackUrl || '/' });
	};

	return (
		<div>
			<h1>Sign in</h1>
			{Object.values(providers).map((provider) => (
				<div key={provider.id}>
					<button onClick={() => signIn(provider)}>
						{provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps(context) {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
