const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			console.error('[error]', error);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
			// Voer hier de betalingslogica uit, zoals het aanroepen van uw backend
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type='submit' disabled={!stripe}>
				Betalen
			</button>
		</form>
	);
};
