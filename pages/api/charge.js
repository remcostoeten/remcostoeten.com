import Stripe from 'stripe';
import Router from 'next/router';
// const stripe = new Stripe(process.env.STRIPE_TEST_PUBLIC_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

const handleCharge = async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { amount, paymentMethod } = req.body;

			const payment = await stripe.paymentIntents.create({
				amount,
				currency: 'eur',
				payment_method: paymentMethod.id,
				confirm: true,
			});

			res.status(200).json({ success: true, payment });
		} catch (error) {
			res.status(500).json({ success: false, error: error.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

export default handleCharge;
