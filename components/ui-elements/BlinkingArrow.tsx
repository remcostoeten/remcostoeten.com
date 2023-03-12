import { useState } from 'react';
import { motion } from 'framer-motion';

const BlinkingArrow = () => {
	const [isBlinking, setIsBlinking] = useState(true);

	// Animation variants
	const arrowVariants = {
		animate: {
			x: [0, 20, 0],
			transition: {
				duration: 0.8,
				repeat: Infinity,
			},
		},
		hidden: {
			opacity: 0,
			x: 0,
			transition: {
				duration: 0.2,
			},
		},
	};

	return (
		<>
			<div onClick={() => setIsBlinking(false)}>
				<span className='text'>X</span>
				<span className='text'>Click to change color palette</span>
				<motion.div
					className='blinking-arrow'
					animate={isBlinking ? 'animate' : 'hidden'}
					variants={arrowVariants}>
					<span className='icon'>➔</span>
				</motion.div>
			</div>
		</>
	);
};

export default BlinkingArrow;
