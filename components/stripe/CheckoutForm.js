import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Modal, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Confetti from 'react-confetti';

export default function CheckoutForm() {
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
						amount: 150,
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
			<div className='fixed z-10 inset-0 overflow-y-auto'>
				<div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<div
						className='fixed inset-0 transition-opacity'
						aria-hidden='true'>
						<div className='absolute inset-0 bg-gray-500 opacity-75'></div>
					</div>

					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'>
						&#8203;
					</span>

					<div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
						<div className='bg-gray-50 px-4 py-5 sm:px-6'>
							<div className='flex items-center'>
								<img
									className='h-8 w-auto'
									src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
									alt='Workflow'
								/>
								<h3 className='text-lg leading-6 font-medium text-gray-900 ml-2'>
									Checkout
								</h3>
							</div>
						</div>
						<div className='px-4 py-5 sm:p-6'>
							<form onSubmit={handleSubmit}>
								<div className='space-y-4'>
									<div>
										<label
											htmlFor='card-number'
											className='sr-only'>
											Card number
										</label>
										<div className='relative'>
											<CardElement
												id='card-number'
												options={{
													style: {
														base: {
															fontSize: '16px',
														},
													},
												}}
												className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md'
											/>
											<div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
												<svg
													className='h-5 w-5 text-gray-400'
													fill='currentColor'
													viewBox='0 0 20 20'>
													<path
														fillRule='evenodd'
														clipRule='evenodd'
														d='M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L3.29289 6.70711C2.90237 6.31658 2.90237 5.68342 3.29289 5.29289C3.68342 4.90237 4.31658 4.90237 4.70711 5.29289L10 10.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z'
													/>
												</svg>
											</div>
										</div>
									</div>
									<div className='flex flex-wrap -mx-3'>
										<div className='w-full md:w-1/2 px-3'>
											<label
												htmlFor='card-expiry-date'
												className='sr-only'>
												Card expiry date{' '}
											</label>
											<div className='relative'>
												<input
													type='text'
													id='card-expiry-date'
													autoComplete='cc-exp'
													className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md'
													placeholder='MM / YY'
												/>
											</div>
										</div>
										<div className='w-full md:w-1/2 px-3 mt-4 md:mt-0'>
											<label
												htmlFor='card-cvc'
												className='sr-only'>
												Card security code
											</label>
											<div className='relative'>
												<input
													type='text'
													id='card-cvc'
													autoComplete='off'
													className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md'
													placeholder='CVC'
												/>
												<div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
													<Tooltip
														title='The 3-digit code on the back of your card'
														arrow>
														<IconButton>
															<InfoIcon className='h-5 w-5 text-gray-400' />
														</IconButton>
													</Tooltip>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='mt-5 sm:mt-6'>
									<button
										type='submit'
										className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'>
										<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
											<svg
												className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													clipRule='evenodd'
													d='M3 4C3 2.89543 3.89543 2 5 2H15C16.1046 2 17 2.89543 17 4V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V4ZM5 4V16H15V4H5ZM9 12H11V14H9V12ZM9 6H11V10H9V6Z'
												/>
											</svg>
										</span>
										<span>Pay $150</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
