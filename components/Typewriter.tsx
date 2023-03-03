import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

const Typewriter = () => {
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShowText(true), 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='typewriter'>
			<AnimatePresence>
				{showText && (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}>
						Click to toggle search functionality
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
};
export default Typewriter;
