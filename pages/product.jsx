import Image from 'next/image';
import StripeContainer from '../components/stripe/StripeContainer';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { Modal } from '@mui/material';
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

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

const Product = () => {
	const router = useRouter();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [imgSrc, setImgSrc] = useState('/majinTwo.gif');

	const handleImageChange1 = () => {
		setImgSrc('/majin.webp');
	};

	const handleImageChange2 = () => {
		setImgSrc('/majinTwo.gif');
	};

	const handleImageChange3 = () => {
		setImgSrc('/majinTree.gif');
	};

	const handleOpen = () => {
		setOpenModal(true);
	};

	const handleModalClose = () => {
		setOpenModal(false);
	};

	const handleClose = () => {
		setSelectedProduct(null);
	};

	const handlePurchase = (product) => {
		setSelectedProduct(product);
	};

	const handleImageChange = (event) => {
		const { value } = event.target;
		if (value === '1') {
			setImgSrc('/majin.webp');
		} else if (value === '2') {
			setImgSrc('/majinTwo.webp');
		} else if (value === '3') {
			setImgSrc('/majinThree.gif');
		}
	};

	return (
		<div className='product-page'>
			<div className='section-fluid-main'>
				<div className='section'>
					<div className='mp-4 info-wrap mob-margin'>
						<p className='title-up'>Stripe test</p>
						<h2>Donate Remcostoeten</h2>
						<h4>
							$1 <span>$2</span>
						</h4>
						<div className='section-fluid'>
							<input
								className='desc-btn'
								type='radio'
								id='desc-1'
								name='desc-btn'
								defaultChecked=''
							/>
							<label htmlFor='desc-1'>Description</label>
							<input
								className='desc-btn'
								type='radio'
								id='desc-2'
								name='desc-btn'
							/>
							<label htmlFor='desc-2'>Details</label>
							<div className='section-fluid desc-sec accor-1'>
								<p>
									The chair construction is made of ash tree.
									Upholstery and wood color at customers
									request.
								</p>
							</div>
							<div className='section-fluid desc-sec accor-2'>
								<div className='section-inline'>
									<p>
										<span>76</span>cm
										<br />
										Lenght
									</p>
								</div>
								<div className='section-inline'>
									<p>
										<span>68</span>cm
										<br />
										Width
									</p>
								</div>
								<div className='section-inline'>
									<p>
										<span>87</span>cm
										<br />
										Height
									</p>
								</div>
								<div className='section-inline'>
									<p>
										<span>10</span>kg
										<br />
										Weight
									</p>
								</div>
							</div>
						</div>
						<h5>Choose upholstery:</h5>
					</div>
					<div className='clearfix' />
					<input
						className='color-btn for-color-1'
						type='radio'
						id='color-1'
						name='color-btn'
						defaultChecked=''
					/>

					<label className='first-color' htmlFor='color-1' />
					<input
						className='color-btn for-color-2'
						type='radio'
						id='color-2'
						name='color-btn'
						onClick={() => {
							document.querySelector(
								'.img-wrap.chair-1 img',
							).src = '/majinTwwo.webp';
						}}
					/>
					<label className='color-2' htmlFor='color-2' />
					<input
						className='color-btn for-color-2'
						type='radio'
						id='color-2'
						name='color-btn'
					/>
					<label className='color-3' htmlFor='color-3' />
					<input
						className='color-btn for-color-1'
						type='radio'
						id='color-1'
						name='color-btn'
						value='1'
						defaultChecked=''
						onChange={handleImageChange}
					/>
					<label className='color-4' htmlFor='color-4' />
					<input
						className='color-btn for-color-5'
						type='radio'
						id='color-5'
						name='color-btn'
					/>
					<label className='color-5' htmlFor='color-5' />
					<input
						className='color-btn for-color-6'
						type='radio'
						id='color-6'
						name='color-btn'
					/>
					<label className='color-6' htmlFor='color-6' />
					<div className='clearfix' />
					<div className='info-wrap'>
						<button onClick={handleOpen} href='#' className='btn'>
							<i className='uil uil-shopping-cart icon' /> Add To
							Cart
						</button>
					</div>
					{selectedProduct && (
						<div>
							<h2>Checkout</h2>
							<StripeContainer product={selectedProduct} />
							<button onClick={handleClose}>Close</button>
						</div>
					)}
					<div className='img-wrap chair-1'>
						<Image
							src={imgSrc}
							alt='Product Image'
							width={500}
							height={500}
						/>
					</div>
					<div className='product__variant'>
						<button onClick={handleImageChange1}>Image 1</button>
						<button onClick={handleImageChange2}>Image 2</button>
						<button onClick={handleImageChange3}>Image 3</button>
					</div>
				</div>
				<Modal open={openModal} onClose={handleClose}>
					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				</Modal>
			</div>
		</div>
	);
};

export default Product;
