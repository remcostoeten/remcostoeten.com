import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import { Info } from '@mui/icons-material';
import { motion } from 'framer-motion';

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import styled from '@emotion/styled';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 500,
	},
});

const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 'none',
	},
});

const Header = () => {
	const headerVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<>
			<motion.header
				className='header'
				variants={headerVariants}
				initial='hidden'
				animate='visible'>
				<div className='container header__inner'>
					<motion.div
						className='header__user'
						whileHover={{ scale: 1.05 }}>
						<Image
							src='/remco.png'
							alt='Remco'
							width={90}
							height={90}
						/>
						<div className='header__tagline'>
							<motion.div whileHover={{ scale: 1.05 }}>
								<h3>remcostoeten</h3>
							</motion.div>
							<h4>front-end developer</h4>
						</div>
					</motion.div>
					<nav className='header__menu'>
						<ul>
							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/whatsapp-export'>
									Chat feature
								</Link>
							</motion.li>
							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/Authentication'>
									Login
									<div className='tooltip'>
										<Tooltip title='Still under construction so most likely will be broken.'>
											<IconButton>
												<Info
													sx={{ color: '#9742f6' }}
												/>
											</IconButton>
										</Tooltip>
									</div>
								</Link>
							</motion.li>
							<motion.li whileHover={{ scale: 1.05 }}>
								<Link href='/contact'>Contact</Link>
							</motion.li>
							<motion.li whileHover={{ scale: 1.05 }}>
								<a
									href='https://github.com/remcostoeten/'
									target='_blank'
									rel='noreferrer'>
									Github
								</a>
							</motion.li>
						</ul>
					</nav>
				</div>
			</motion.header>
		</>
	);
};

export default Header;
