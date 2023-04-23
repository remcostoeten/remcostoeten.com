import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect } from 'react';
import StripeContainer from '../components/stripe/StripeContainer';
import { Modal, Tooltip, IconButton } from '@mui/material';

const Product = () => {
	const router = useRouter();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [openModal, setOpenModal] = useState(false);

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

	useEffect(() => {
		document.body.classList.add('product-page');
	});

	return (
		<>
			<div className='section-fluid-main'>
				<div className='section'>
					<div className='info-wrap mob-margin'>
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
					/>
					<label className='color-2' htmlFor='color-2' />
					<input
						className='color-btn for-color-3'
						type='radio'
						id='color-3'
						name='color-btn'
					/>
					<label className='color-3' htmlFor='color-3' />
					<input
						className='color-btn for-color-4'
						type='radio'
						id='color-4'
						name='color-btn'
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
						{/* onClick={handlePurchase} */}
						<button onClick={handleOpen} href='#' className='btn'>
							<i className='uil uil-shopping-cart icon' /> Add To
							Cart
						</button>
					</div>
					{selectedProduct && (
						<div>
							<h2>Checkout</h2>
							<i>
								Creditcard number 42*repeat tillfull. CCV + date
								any 3 number combiantion{'  '}
							</i>{' '}
							<StripeContainer product={selectedProduct} />
							<button onClick={handleClose}>Close</button>
						</div>
					)}
					<div className='img-wrap chair-1'>
						<Image
							src='/majin.webp'
							alt='Majin Image'
							width={500}
							height={500}
						/>{' '}
					</div>
				</div>
			</div>
			<Modal open={openModal} onClose={handleClose}>
				<div className='text-slate-800 bg-white py-4 rounded-md w-80 flex content-center flex-col bg-center justify-center mx-auto my-40 py-10'>
					<h2 className='mx-4 text-slate-600  text-lg font-medium mb-4'>
						Checkout
					</h2>

					<StripeContainer product={selectedProduct} />
					<div className='flex items-center mt-4'>
						<button
							className=' py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'
							onClick={handleModalClose}>
							Close
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Product;
