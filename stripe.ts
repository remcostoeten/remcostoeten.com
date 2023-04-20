import { loadStripe } from '@stripe/stripe-js';

const getStripe = async () => {
	const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

	if (!stripePublicKey) {
		throw new Error('Missing Stripe public key.');
	}

	return await loadStripe(stripePublicKey);
};

export default getStripe;
