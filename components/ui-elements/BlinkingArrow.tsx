import { useState } from 'react';
import { motion } from 'framer-motion';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const BlinkingArrow = () => {
	const [isBlinking, setIsBlinking] = useState(true);
	const [showText, setShowText] = useState(true);

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
			<div
				className={`speeddial__inner ${showText ? '' : 'fade-out'}`}
				onClick={() => {
					setIsBlinking(false);
					setShowText(false);
				}}>
				<span className='text'>
					<HighlightOffIcon className='close' />
					Click to change color palette
				</span>
				<motion.div
					className='blinking-arrow'
					animate={isBlinking ? 'animate' : 'hidden'}
					variants={arrowVariants}>
					<span className='icon'>➔</span>
				</motion.div>
			</div>
			<style jsx>{`
				.fade-out {
					opacity: 0;
					transition: opacity 0.5s ease-in-out;
				}
			`}</style>
		</>
	);
};

export default BlinkingArrow;
