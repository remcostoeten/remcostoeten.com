import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
interface TooltipProps {
	handleToggle: () => void;
	showText: string;
	showChatInput: boolean;
	setShowChatInput: (value: boolean) => void;
}

function Tooltip({
	handleToggle,
	showText,
	showChatInput,
	setShowChatInput,
}: TooltipProps) {
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowTooltip(false);
		}, 50000);
	}, []);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, ease: 'easeInOut' },
		},
	};

	const textVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.5, ease: 'easeInOut' },
		},
		exit: {
			opacity: 0,
			x: 10,
			transition: { duration: 0.5, ease: 'easeInOut' },
		},
	};

	return (
		<AnimatePresence>
			{showTooltip && (
				<motion.div
					className='tooltip'
					variants={containerVariants}
					initial='hidden'
					animate='visible'
					exit='hidden'>
					<motion.span
						className='text'
						variants={textVariants}
						initial='hidden'
						animate='visible'
						exit='exit'>
						Click to toggle search functionality
					</motion.span>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
export default Tooltip;
