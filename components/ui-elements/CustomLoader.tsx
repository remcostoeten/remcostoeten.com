import React from 'react';
import { motion } from 'framer-motion';

const CustomLoader: React.FC = () => {
	return (
		<div className='loader'>
			<motion.div
				className='spinner'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
			/>
			<style jsx>{`
				.loader {
					position: fixed;
					z-index: 999;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #fff;
				}
				.spinner {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					border: 5px solid #ccc;
					border-top-color: #333;
				}
			`}</style>
		</div>
	);
};

export default CustomLoader;
