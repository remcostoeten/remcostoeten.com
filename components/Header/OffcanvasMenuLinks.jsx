import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Pills } from '@/components/ui-elements/Pills';

export default function OffcanvasMenuLinks(props) {
	const handleCloseMenu = props.handleCloseMenu;
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(true);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const items = [
		{
			label: 'Text extractor tool',
			href: '/url-filtering-tool',
			pills: <Pills variant='tool' text='Tool' />,
		},
		{
			label: 'Chat export',
			href: '/chat-export',
			pills: <Pills variant='upcoming' text='Showcase' />,
		},
		{
			label: 'Loaders',
			href: '/loaders',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='showcase' text='Showcase' />
				</>
			),
		},
		{
			label: 'Login',
			href: '/log',
			pills: <Pills variant='wip' text='WiP' />,
		},
		{
			label: 'Not Authorized',
			href: '/not-authenticated',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='wip' text='WiP' />
				</>
			),
		},
		{
			label: 'Stripe v1',
			href: '/product',
			pills: <Pills variant='wip' text='WiP' />,
		},
		{
			label: 'Stripe v2',
			href: '/stripe-payment',
			pills: <Pills variant='wip' text='WiP' />,
		},
		{
			label: 'Webgl',
			href: '/webgl',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='wip' text='WiP' />
					<Pills variant='showcase' text='Showcase' />
				</>
			),
		},
	];

	return (
		<div className='offcanvas-menu__menu'>
			<div className='offcanvas-menu__menu--tagline'>
				<h2 className='animate__flipInX'>Remco stoeten</h2>
				<p className='first'>
					<span>Aspiring to be more</span>
				</p>
				<p className='last'>
					than a <i>divjesschuiver</i>
				</p>
			</div>
			<ul className='offcanvas-menu__items'>
				{items.map((item) => (
					<li
						className='mb-4 flex items-center'
						onClick={handleCloseMenu}
						key={item.href}
						value={item.wip}>
						<Link
							className=' text-base md:text-2xl '
							href={item.href}>
							{item.label}
						</Link>
						{item.pills}
					</li>
				))}
			</ul>
		</div>
	);
}
