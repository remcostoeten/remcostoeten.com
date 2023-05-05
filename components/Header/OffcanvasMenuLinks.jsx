import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function OffcanvasMenuLinks(props) {
	const handleCloseMenu = props.handleCloseMenu;
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(true);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const wip = (wip) => {
		if (wip) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-red-200 text-red-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					WiP
				</div>
			);
		}
		return '';
	};

	const tool = (tool) => {
		if (tool) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-cyan-200 text-cyan-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					Tool
				</div>
			);
		}
		return '';
	};

	const experiment = (experiment) => {
		if (experiment) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-teal-200 text-teal-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					Experiment
				</div>
			);
		}
		return '';
	};

	const old = (old) => {
		if (old) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-amber-200 text-amber-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					Old design
				</div>
			);
		}
		return '';
	};

	const showcase = (showcase) => {
		if (showcase) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-green-200 text-green-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					Showcase
				</div>
			);
		}
		return '';
	};

	const upcomming = (upcomming) => {
		if (upcomming) {
			return (
				<div
					className={`flex h-6 pill scale-75text-smalign-middle px-3 py-2 items-center justify-center ml-2 bg-indigo-200 text-indigo-800 rounded-full ${
						visible
							? 'opacity-100 transition-opacity duration-500  ease-in    '
							: 'opacity-0'
					}`}>
					v2 upcomming
				</div>
			);
		}
		return '';
	};

	const items = [
		{
			label: 'Text extractor tool',
			href: '/url-filtering-tool',
			tool: true,
		},
		{
			label: 'Chat export',
			href: '/chat-export',
			upcomming: showcase,
		},

		{
			label: 'Loaders',
			href: '/loaders',
			experiment: true,
			showcase: true,
		},

		{ label: 'Login', href: '/log', wip: true },

		{
			label: 'Not Authorized',
			href: '/not-authenticated',
			experiment: true,
			wip: true,
		},

		{ label: 'Stripe v1', href: '/product', wip: true },
		{ label: 'Stripe v2', href: '/stripe-payment', wip: true },
		{
			label: 'Webgl',
			href: '/webgl',
			experiment: true,
			wip: true,
			showcase: true,
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
						{wip(item.wip)}
						{item.showcase && showcase(item.showcase)}
						{item.old && old(item.old)}
						{item.upcomming && upcomming(item.upcomming)}
						{item.tool && upcomming(item.tool)}
					</li>
				))}
			</ul>
		</div>
	);
}
