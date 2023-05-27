import React from 'react';
import { motion } from 'framer-motion';
import Background from '@/public/Background.png';

export default function Parallax() {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	const bgImage = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	};

	return (
		<div className="w-screen h-screen  flex align-top justify-center">
			<motion.div
				className="text-center pt-hero text-white text-xxxl text-bold leading-none"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<motion.h1 variants={item}>Hi, I'm Remco Stoeten</motion.h1>
				<motion.h1 variants={item}>a passionate developer</motion.h1>
			</motion.div>
			<motion.img
				src="/cutout.png"
				alt="background"
				variants={bgImage}
				initial="hidden"
				animate="show"
				transition={{ delay: 3 }}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: 1,
				}}
			/>
			<motion.img
				src="/Background.png"
				alt="background"
				variants={bgImage}
				initial="hidden"
				animate="show"
				transition={{ delay: 5 }}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					zIndex: -1,
				}}
			/>
		</div>
	);
}
