import { useState, useEffect } from 'react';
import StripeContainer from '../components/stripe/StripeContainer';

export default function ProductPage() {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const sizes = ['S', 'M', 'L', 'XL'];

	const handlePurchase = (product) => {
		setSelectedProduct(product);
	};

	const handleClose = () => {
		setSelectedProduct(null);
	};

	const addToCart = () => {
		console.log('Item added to cart with size:', selectedSize);
		setShowModal(true);
	};

	useEffect(() => {
		document.body.classList.add('pdp');
		return () => {
			document.body.classList.remove('pdp');
		};
	}, []);

	return (
		<>
			<main>
				<div className='container'>
					<div className='grid grid-cols-12 gap-4 product'>
						<div className='col-span-12 md:col-span-7'>
							<div className='product-gallery'>
								<div className='product-image'>
									<img
										className='active'
										src='https://source.unsplash.com/W1yjvf5idqA'
									/>
								</div>
								<ul className='image-list'>
									<li className='image-item'>
										<img src='https://source.unsplash.com/W1yjvf5idqA' />
									</li>
									<li className='image-item'>
										<img src='https://source.unsplash.com/VgbUxvW3gS4' />
									</li>
									<li className='image-item'>
										<img src='https://source.unsplash.com/5WbYFH0kf_8' />
									</li>
								</ul>
							</div>
						</div>
						<div className='col-span-12 md:col-span-5'>
							<h1>Bonsai</h1>
							<h2>$19.99</h2>
							<div className='description'></div>
							<button
								onClick={handlePurchase}
								className='add-to-cart'>
								Add To Cart
							</button>
						</div>
						{selectedProduct && (
							<div>
								<h2>Checkout</h2>

								<StripeContainer product={selectedProduct} />
								<button onClick={handleClose}>Close</button>
							</div>
						)}
					</div>
				</div>
			</main>
			{showModal && selectedProduct && (
				<StripeContainer
					product={selectedProduct}
					setShowModal={setShowModal}
				/>
			)}
		</>
	);
}
