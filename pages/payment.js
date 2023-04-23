// pages/payment.js
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
	const [clientSecret, setClientSecret] = useState('');
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);
	const [paypalLink, setPaypalLink] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		axios.post('/api/stripe').then((response) => {
			setClientSecret(response.data.client_secret);
		});
	}, []);

	useEffect(() => {
		axios.post('/api/paypal').then((response) => {
			setPaypalLink(response.data.approval_url);
		});
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setProcessing(true);

		const cardElement = elements.getElement(CardElement);
		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
			},
		});

		if (result.error) {
			setError(result.error.message);
			setProcessing(false);
		} else {
			if (result.paymentIntent.status === 'succeeded') {
				setError(null);
				setProcessing(false);
				alert('Payment Successful!');
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<h3>Stripe Payment</h3>
				<CardElement />
				<button type='submit' disabled={!stripe || processing}>
					{processing ? 'Processing...' : 'Pay'}
				</button>
				{error && <div>{error}</div>}
			</form>
			<div>
				<h3>PayPal Payment</h3>
				<a href={paypalLink} target='_blank' rel='noreferrer'>
					<button disabled={!paypalLink}>Pay with PayPal</button>
				</a>
			</div>
		</div>
	);
};

const Payment = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default Payment;
