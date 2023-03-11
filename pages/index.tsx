import { useState } from 'react';
import Header from '@/components/header/Header';
import Intro from '@/components/layout/Intro';
import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';

export default function Home() {
	const [variant, setVariant] = useState('theme--variant');

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
			onClick: () => setVariant('theme--variant'),
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
			<SpeedDial
				ariaLabel='Change color palette'
				sx={{ position: 'absolute', bottom: 16, right: 16 }}
				// icon={<SpeedDialIcon />}
				className='color-palette'>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.onClick} // use the onClick function defined for this action
						className='my-speed-dial-action'
					/>
				))}
			</SpeedDial>

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
		</>
	);
}
