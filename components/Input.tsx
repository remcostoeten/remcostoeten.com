import React from 'react';
import { motion } from 'framer-motion';

const InputField = () => {
	return (
		<motion.div className='input-field'>
			<input type='text' placeholder='Enter your text here' />
			<motion.span
				className='placeholder'
				initial={{ y: 0 }}
				animate={{
					y: -5,
					transition: {
						repeat: Infinity,
						duration: 0.5,
						ease: 'easeInOut',
					},
				}}>
				Enter your text here
			</motion.span>
		</motion.div>
	);
};

export default InputField;
