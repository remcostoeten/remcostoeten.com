import { useState } from 'react';
import StripeContainer from '../components/stripe/StripeContainer';

const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handlePurchase = (product) => {
        setSelectedProduct(product);
    };

    return (
        
    );
}