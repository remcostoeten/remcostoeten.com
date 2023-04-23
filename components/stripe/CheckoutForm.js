import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
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

				const data = await response.json();

				if (data.success) {
					toast.success('Payment Successful!');
				} else {
					toast.error(`Error: ${data.error}`);
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
			<Tooltip
				title='Test creditcard credentials :5555555555554444, CCV any digits, date any future date. Or 4242424242424242'
				placement='right'>
				<InfoIcon />
			</Tooltip>
			<form
				className='container bg-slate-300'
				onSubmit={handleSubmit}
				style={{ maxWidth: 400 }}>
				<CardElement />;<button>Pay</button>
			</form>
		</>
	);
};
