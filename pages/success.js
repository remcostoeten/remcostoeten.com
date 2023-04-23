// pages/success.js
import { useRouter } from 'next/router';

const Success = () => {
	const router = useRouter();

	const handleGoBack = () => {
		router.push('/');
	};

	return (
		<div>
			<h2>Payment Successful!</h2>
			<p>Thank you for your donation.</p>
			<button onClick={handleGoBack}>Go back</button>
		</div>
	);
};

export default Success;
