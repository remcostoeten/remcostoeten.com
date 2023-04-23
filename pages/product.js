import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect } from 'react';
import StripeContainer from '../components/stripe/StripeContainer';
import { Modal, Tooltip, IconButton } from '@mui/material';
import { Transition } from '@headlessui/react';

const Product = () => {
	const router = useRouter();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [imageSrc, setImageSrc] = useState('/majin.webp');

	const handleClickVariant1 = () => {
		setImageSrc('/majin.webp');
	};

	const handleClickVariant2 = () => {
		setImageSrc('/majinThree.gif');
	};

	const handleClickVariant3 = () => {
		setImageSrc('/majinTwo.gif');
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
						<h5>Choose variant:</h5>
					</div>
					<div className='clearfix' />
					<div className='my-10 product__variant'>
						<button
							className='btn btn--variant'
							onClick={handleClickVariant1}>
							Variant 1
						</button>
						<button
							className='btn btn--variant'
							onClick={handleClickVariant2}>
							Variant 2
						</button>
						<button
							className='btn btn--variant'
							onClick={handleClickVariant3}>
							Variant 3
						</button>
					</div>
					<div className='img-wrap'>
						<Image
							src={imageSrc}
							alt='Majin Image'
							width={500}
							height={500}
						/>
					</div>
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

							<StripeContainer product={selectedProduct} />
						</div>
					)}
					<div className='img-wrap'>
						<div className='img-wrap'>
							<Image
								src={imageSrc}
								alt='Majin Image'
								width={500}
								height={500}
							/>
						</div>
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
