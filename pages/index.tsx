import { useState } from 'react';
import Header from '@/components/header/Header';
import Intro from '@/components/layout/Intro';
import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Github from '@mui/icons-material/GitHub';
import { Mail, WhatsApp } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { motion } from 'framer-motion';
import BlinkingArrow from '@/components/ui-elements/BlinkingArrow';
export default function Home() {
	const [variant, setVariant] = useState('theme--variant');
	const [isBlinking, setIsBlinking] = useState(true);

	const handleVariantToggle = () => {
		switch (variant) {
			case 'theme--variant':
				setVariant('theme--variant');
				break;
			case 'theme--variant-two':
				setVariant('theme--variant-two');
				break;
			case 'theme--variant-three':
				setVariant('theme--variant-three');
				break;
			case 'theme--variant-four':
				setVariant('theme--variant--four');
				break;
			default:
				setVariant('theme--variant');
				break;
		}
	};
	const actions = [
		{
			icon: false,
			name: 'Palette one',
			onClick: () => setVariant('theme--variant            '),
		},
		{
			icon: false,
			name: 'Palette two',
			onClick: () => setVariant('theme--variant-two'),
		},
		{
			icon: false,
			name: 'Palette three',
			onClick: () => setVariant('theme--variant-three'),
		},
		{
			icon: false,
			name: 'Palette four',
			onClick: () => setVariant('theme--variant-four'),
		},
	];

	return (
		<>
			<div className='widget'>Click to change background</div>

			<div className='speeddial'>
				<SpeedDial
					ariaLabel='Change color palette'
					sx={{ position: 'absolute', bottom: 16, right: 16 }}
					className='color-palette'>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							onClick={action.onClick}
							className='my-speed-dial-action'
						/>
					))}
				</SpeedDial>
				<div className='speeeddial__text'>
					<BlinkingArrow />
				</div>
			</div>

			<div className='theme'>
				<div className={variant}></div>
				<div className={`${variant} bg2`}></div>
				<div className={`${variant} bg3`}></div>
				<div className='content'></div>
			</div>
			<Header />
			<div className='container'>
				<Intro />
			</div>
			<div className='header__speeddial'>
				<div>
					<a
						href='https://github.com/remcostoeten/'
						target='_blank'
						rel='noreferrer'>
						<Github />
					</a>
				</div>
				<div>
					{' '}
					<WhatsApp />
				</div>

				<div>
					{' '}
					<Mail />
				</div>
			</div>
		</>
	);
}
