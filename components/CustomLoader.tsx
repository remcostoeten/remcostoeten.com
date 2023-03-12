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
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
				.spinner {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					border: 5px solid #ccc;
					border-top-color: #333;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			`}</style>
		</div>
	);
};

export default CustomLoader;
