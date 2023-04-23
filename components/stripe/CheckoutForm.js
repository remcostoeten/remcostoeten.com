import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Modal, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Confetti from 'react-confetti';
export const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const [showConfetti, setShowConfetti] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (!error) {
			console.log('Stripe 23 | token generated!', paymentMethod);
			try {
				const response = await fetch('/api/charge', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						paymentMethod: paymentMethod,
						amount: 150 ,
					}),
				});

				const resp = await response.json();

				if (resp.success) {
					toast.success('Payment Successful!');
					setShowConfetti(true);
					setTimeout(() => {
						router.push('/');
					}, 3000);
				} else {
					toast.error(`Error: ${resp.error}`);
				}
			} catch (error) {
				toast.error(`Error: ${error.message}`);
			}
		} else {
			toast.error(`Error: ${error.message}`);
		}
	};

	return (
		<>
			<div>
				<form
					className='stripe-form py-4 mx-4 text-white'
					onSubmit={handleSubmit}
					style={{ maxWidth: 400 }}>
					<CardElement />
					<button onClick={handleSubmit}>Pay</button>
				</form>
			</div>
		</>
	);
};
