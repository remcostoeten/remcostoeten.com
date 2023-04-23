import React from 'react';

const Product = ({ product, onPurchase }) => {
	return (
		<div>
			<h3>{product.name}</h3>
			<p>Price: €{product.price / 100}</p>
			<button onClick={() => onPurchase(product)}>Buy Now</button>
		</div>
	);
};

export default Product;
