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
			label: 'Task kanban board',
			href: '/tasks',
			pills: (
				<>
					<Pills variant='tool' text='Tool' />
					<Pills variant='showcase' text='Showcase' />
				</>
			),
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
			pills: <Pills variant='wip' text='Work in progress' />,
		},
		{
			label: 'Not Authorized',
			href: '/not-authenticated',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='wip' text='Work in progress' />
				</>
			),
		},
		{
			label: 'Stripe v1',
			href: '/product',
			pills: <Pills variant='wip' text='Work in progress' />,
		},
		{
			label: 'Stripe v2',
			href: '/stripe-payment',
			pills: <Pills variant='wip' text='Work in progress' />,
		},
		{
			label: 'Webgl',
			href: '/webgl',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='showcase' text='Showcase' />
				</>
			),
		},
		{
			label: 'ThreeJS blob',
			href: '/Blob',
			pills: (
				<>
					<Pills variant='experiment' text='Experiment' />
					<Pills variant='showcase' text='Showcase' />
				</>
			),
		},
		{
			label: 'SvelteKit',
			href: process.env.SVELTE_APP_URL,
			pills: (
			  <>
				<Pills variant='showcase' text='Showcase' />
			  </>
			),
		  },
	];

	const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : '';

 

	return (
		<>
		  <ul className='offcanvas-menu__items'>
			{items.map((item) => (
			  <li
				className='mb-2 flex items-center'
				onClick={handleCloseMenu}
				key={item.href}
				value={item.wip}
			  >
				{item.href === '/sveltekit' ? (
				  <a className='text-lg text-off-white ' href={process.env.SVELTE_APP_URL}>
					{item.label}
				  </a>
				) : (
				  <Link className='text-lg text-off-white ' href={item.href}>
					{item.label}
				  </Link>
				)}
				{item.pills}
			  </li>
			))}
		  </ul>
		</>
	  );
	  
}
