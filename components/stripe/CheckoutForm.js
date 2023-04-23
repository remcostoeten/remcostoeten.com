import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { Modal, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
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
						amount: 1000, // Replace this with the actual amount you want to charge
					}),
				});

				const resp = await response.json();

				if (resp.success) {
					toast.success('Payment Successful!');
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
			<form
				className='stripe-form py-4 mx-4 text-white'
				onSubmit={handleSubmit}
				style={{ maxWidth: 400 }}>
				<CardElement />
				<button onClick={handleSubmit}>Pay</button>
			</form>
			<Tooltip
				title='Card numnber: 5555555555554444, or 4242424242424242, CCV and DATE any combination.'
				placement='right'>
				<InfoIcon />
			</Tooltip>
		</>
	);
};
