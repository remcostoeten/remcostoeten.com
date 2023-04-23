import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
	const { amount } = req.body;

	try {
		// Create a new Checkout Session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['ideal'],
			line_items: [
				{
					price_data: {
						currency: 'eur',
						product_data: {
							name: 'Donate Remco',
						},
						price: 100,
						unit_amount: amount,
					},
					quantity: 1588,
				},
			],
			mode: 'payment',
			success_url: `${req.headers.origin}/success`,
			cancel_url: `${req.headers.origin}/cancel`,
		});

		// Return session ID as response
		res.send({ id: session.id });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
}
