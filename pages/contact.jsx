import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			name,
			email,
			message,
		};
		fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(() => toast.success('Email sent successfully!'))
			.catch((error) =>
				toast.error('An error occurred while sending your message.'),
			);
	};

	return (
		<div>
			<h1>Contact Us</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<label>
					Email:
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Message:
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
					/>
				</label>
				<button type='submit'>Send</button>
			</form>
		</div>
	);
};

export default Contact;
