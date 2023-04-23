import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
	useStripe,
	useElements,
	PaymentElement,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const [showConfetti, setShowConfetti] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements,
			confirmParams: {
				return_url: 'https://example.com/order/123/complete',
			},
		});

		if (!error) {
			// ... (existing code)
			if (data.success) {
				toast.success('Payment Successful!');
				setShowConfetti(true);
				setTimeout(() => {
					router.push('/');
				}, 3000); // Redirect after 3 seconds
			} else {
				toast.error(`Error: ${data.error}`);
			}
		} else {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<>
			{showConfetti && <Confetti />}
			<form onSubmit={handleSubmit}>
				<PaymentElement />
				<button disabled={!stripe}>Submit</button>
			</form>
		</>
	);
};

export default CheckoutForm;
