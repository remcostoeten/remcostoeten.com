import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	});

	const validateForm = () => {
		const newErrors = {
			name: '',
			email: '',
			message: '',
		};

		if (!name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (!email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!message.trim()) {
			newErrors.message = 'Message is required';
		}

		setErrors(newErrors);
		return Object.values(newErrors).every((val) => val === '');
	};

	const handleNextStep = (event: React.FormEvent) => {
		event.preventDefault();
		if (validateForm()) {
			setStep(step + 1);
		}
	};

	return (
		<div className='container my-5'>
			<motion.h1
				className='text-center mb-5'
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}>
				Contact Us
			</motion.h1>
			{step === 1 && (
				<>
					<form>
						<div className='form-group'>
							<motion.label
								initial={{ y: -50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.5 }}>
								Name
							</motion.label>
							<motion.input
								type='text'
								className={`form-control ${
									errors.name ? 'is-invalid' : ''
								}`}
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
								initial={{ x: -50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.5 }}
							/>
							{errors.name && (
								<div className='invalid-feedback'>
									{errors.name}
								</div>
							)}
						</div>
						<div className='form-group'>
							<motion.label
								initial={{ y: -50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.4, duration: 0.5 }}>
								Email
							</motion.label>
							<motion.input
								type='email'
								className={`form-control ${
									errors.email ? 'is-invalid' : ''
								}`}
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								initial={{ x: -50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.6, duration: 0.5 }}
							/>
							{errors.email && (
								<div className='invalid-feedback'>
									{errors.email}
								</div>
							)}
						</div>
						<div className='form-group'>
							<motion.label
								initial={{ y: -50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}>
								Message
							</motion.label>
							<motion.textarea
								className={`form-control ${
									errors.message ? 'is-invalid' : ''
								}`}
								rows={5}
								value={message}
								onChange={(event) =>
									setMessage(event.target.value)
								}
								initial={{ x: -50, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{
									delay: 1.2,
									duration: 0.5,
								}}></motion.textarea>
							{errors.message && (
								<div className='invalid-feedback'>
									{errors.message}
								</div>
							)}
						</div>
						<motion.button
							type='submit'
							className='btn btn-primary float-right'
							onClick={handleNextStep}
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: 1.4, duration: 0.5 }}>
							Next
						</motion.button>
					</form>
				</>
			)}
			{step === 2 && (
				<motion.div
					className='text-center'
					initial={{ x: 100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}>
					<h3>Thank you for contacting us, {name}!</h3>
					<p>
						We have received your message and will get back to you
						shortly.
					</p>
					<motion.button
						className='btn btn-primary'
						onClick={() => {
							setName('');
							setEmail('');
							setMessage('');
							setErrors({ name: '', email: '', message: '' });
							setStep(1);
						}}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						Go Back
					</motion.button>
				</motion.div>
			)}
		</div>
	);
};

export default ContactPage;
