import { useEffect, useState } from 'react';
import Intro from '@/components/layout/Intro';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Seo from '@/components/Seo';
import BlinkingArrow from '@/components/ui-elements/BlinkingArrow';
export default function Home() {
	const [variant, setVariant] = useState('theme--variant');

	useEffect(() => {
		document.body.classList.add('variant');
	}, []);

	const actions = [
		{
			icon: false,
			name: 'Palette one',
			onClick: () => {
				setVariant('theme--variant');
				document.body.classList.remove(
					'variant-two',
					'variant-three',
					'variant-four',
				);
				document.body.classList.add('variant');
			},
		},
		{
			icon: false,
			name: 'Palette two',
			onClick: () => {
				setVariant('theme--variant-two');
				document.body.classList.remove(
					'variant',
					'variant-three',
					'variant-four',
				);
				document.body.classList.add('variant-two');
			},
		},
		{
			icon: false,
			name: 'Palette three',
			onClick: () => {
				setVariant('theme--variant-three');
				document.body.classList.remove(
					'variant',
					'variant-two',
					'variant-four',
				);
				document.body.classList.add('variant-three');
			},
		},
		{
			icon: false,
			name: 'Palette four',
			onClick: () => {
				setVariant('theme--variant-four');
				document.body.classList.remove(
					'variant',
					'variant-two',
					'variant-three',
				);
				document.body.classList.add('variant-four');
			},
		},
	];
	return (
		<>
			<Seo
				title='Remcostoeten.com front-end developer'
				description='Remco stoeten, front-end developer with six  years off experience. This smy playground site where I test whatever I feel like'
				url='https://www.remcostoeten.com/'
			/>
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
			<div className='container'>
				<Intro />
			</div>
			{/* <div className='header__speeddial'>
				<div>
					<a
						href='https://github.com/remcostoeten/'
						target='_blank'
						rel='noreferrer'>
						<Github />
					</a>
				</div>
				<div>
					<a
						href='https://wa.me/31636590707'
						target='_blank'
						rel='noreferrer'>
						<WhatsApp />
					</a>
				</div>

				<div>
					<a
						href='mailto:remcostoeten@hotmail.com'
						target='_blank'
						rel='noreferrer'>
						<Mail />
					</a>
				</div>
			</div> */}
		</>
	);
}
