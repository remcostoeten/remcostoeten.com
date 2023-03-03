import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mdiMagnify } from '@mdi/js';
import Icon from '@mdi/react';

interface TooltipProps {
	handleToggle: string;
	showText: string;
	showChatInput: boolean;
	setShowChatInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tooltip: React.FC<TooltipProps> = ({
	handleToggle,
	showText,
	showChatInput,
	setShowChatInput,
}) => {
	const [typewriterText, setTypewriterText] = useState('');

	useEffect(() => {
		if (showText) {
			const text = 'Click to toggle search functionality';
			let i = 0;
			const interval = setInterval(() => {
				if (i < text.length) {
					setTypewriterText((prevText) => prevText + text.charAt(i));
					i++;
				} else {
					clearInterval(interval);
					setTimeout(() => {
						setShowChatInput(false);
					}, 5000);
				}
			}, 100);
		} else {
			setTypewriterText('');
		}
	}, [showText, setShowChatInput]);

	return (
		<div className='toggle-wrapper'>
			<span
				className='toggle'
				onClick={() => setShowChatInput(!showChatInput)}
				style={{ color: '#fffd' }}>
				<Icon path={mdiMagnify} size={3} />
				{showText && (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						style={{ marginLeft: '0.5rem' }}>
						{typewriterText}
					</motion.span>
				)}
			</span>
		</div>
	);
};

export default Tooltip;
