// pages/api/paypal.js
import paypal from 'paypal-rest-sdk';

paypal.configure({
	mode: 'sandbox', // or "live" for production
	client_id: process.env.PAYPAL_CLIENT_ID,
	client_secret: process.env.PAYPAL_SECRET,
});

export default async (req, res) => {
	if (req.method === 'POST') {
		const payment = {
			intent: 'sale',
			payer: {
				payment_method: 'paypal',
			},
			redirect_urls: {
				return_url: 'http://localhost:3000/success',
				cancel_url: 'http://localhost:3000/cancel',
			},
			transactions: [
				{
					item_list: {
						items: [
							{
								name: 'Donate Remcostoeten',
								sku: '001',
								price: '1.00',
								currency: 'EUR',
								quantity: 1,
							},
						],
					},
					amount: {
						currency: 'EUR',
						total: '1.00',
					},
					description: 'Donate Remcostoeten',
				},
			],
		};

		paypal.payment.create(payment, (error, createdPayment) => {
			if (error) {
				res.status(500).json({ error: error.message });
			} else {
				for (let i = 0; i < createdPayment.links.length; i++) {
					if (createdPayment.links[i].rel === 'approval_url') {
						res.status(200).json({
							approval_url: createdPayment.links[i].href,
						});
					}
				}
			}
		});
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};
