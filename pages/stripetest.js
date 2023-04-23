// pages/index.js

import React, { useState } from 'react';
import StripeContainer from '../components/stripe/StripeContainer';
import Product from '@/components/stripe/Product';

const products = [
	{
		id: 1,
		name: 'Example Product',
		price: 1, //
	},
	// Add more products if needed
];

const Home = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handlePurchase = (product) => {
		setSelectedProduct(product);
	};

	const handleClose = () => {
		setSelectedProduct(null);
	};

	return (
		<div className='bg-slate-400 py-40'>
			<h1>Products</h1>
			{products.map((product) => (
				<Product
					key={product.id}
					product={product}
					onPurchase={handlePurchase}
				/>
			))}
			{selectedProduct && (
				<div>
					<h2>Checkout</h2>
					<StripeContainer product={selectedProduct} />
					<button onClick={handleClose}>Close</button>
				</div>
			)}
		</div>
	);
};

export default Home;
