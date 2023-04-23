import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../pages/CheckoutForm';

const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLIC_KEY;
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default Stripe;
