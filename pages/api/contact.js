const nodemailer = require('nodemailer');

export default async function handler(req, res) {
	const { name, email, message } = JSON.parse(req.body);
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	try {
		await transporter.sendMail({
			from: email,
			to: 'remcostoeten@hotmail.com',
			subject: `New message from ${name}`,
			text: message,
		});
		res.status(200).json({ message: 'Message sent successfully.' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'An error occurred while sending the message.',
		});
	}
}
