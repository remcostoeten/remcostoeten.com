import Head from 'next/head';
import { Navbar, Dropdown, Button, Link, Text } from '@nextui-org/react';
import Intro from '@/components/layout/Intro';
import UnderConstruction from '@/components/layout/UnderConstruction';
import { AcmeLogo } from './AcmeLogo';
import { icons } from './Icons';
import Login from './Login';
export default function Home() {
	return (
		<>
			{' '}
			<Head>
				<title>Create Next App</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon/favicon.ico' />
			</Head>{' '}
			<UnderConstruction />
			<Navbar isBordered variant='sticky'>
				<div className='container navbar'>
					<Navbar.Brand>
						<AcmeLogo />
						<Text b color='inherit' hideIn='xs'>
							ACME
						</Text>
					</Navbar.Brand>
					<Navbar.Content
						enableCursorHighlight
						activeColor='secondary'
						hideIn='xs'
						variant='underline'>
						<Dropdown>
							<Navbar.Item>
								<Dropdown.Button
									auto
									light
									css={{
										px: 0,
										dflex: 'center',
										svg: { pe: 'none' },
									}}
									iconRight={icons.chevron}
									ripple={false}>
									Features
								</Dropdown.Button>
							</Navbar.Item>
							<Dropdown.Menu
								aria-label='ACME features'
								css={{
									$$dropdownMenuWidth: '340px',
									$$dropdownItemHeight: '70px',
									'& .nextui-dropdown-item': {
										py: '$4',
										// dropdown item left icon
										svg: {
											color: '$secondary',
											mr: '$4',
										},
										// dropdown item title
										'& .nextui-dropdown-item-content': {
											w: '100%',
											fontWeight: '$semibold',
										},
									},
								}}>
								<Dropdown.Item
									key='autoscaling'
									showFullDescription
									description='ACME scales apps to meet user demand, automagically, based on load.'
									icon={icons.scale}>
									Autoscaling
								</Dropdown.Item>
								<Dropdown.Item
									key='usage_metrics'
									showFullDescription
									description='Real-time metrics to debug issues. Slow query added? We’ll show you exactly where.'
									icon={icons.activity}>
									Usage Metrics
								</Dropdown.Item>
								<Dropdown.Item
									key='production_ready'
									showFullDescription
									description='ACME runs on ACME, join us and others serving requests at web scale.'
									icon={icons.flash}>
									Production Ready
								</Dropdown.Item>
								<Dropdown.Item
									key='99_uptime'
									showFullDescription
									description='Applications stay on the grid with high availability and high uptime guarantees.'
									icon={icons.server}>
									+99% Uptime
								</Dropdown.Item>
								<Dropdown.Item
									key='supreme_support'
									showFullDescription
									description='Overcome any challenge with a supporting team ready to respond.'
									icon={icons.user}>
									+Supreme Support
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Navbar.Link href='#'>Pricing</Navbar.Link>
						<Navbar.Link href='#'>Company</Navbar.Link>
					</Navbar.Content>
				</div>
			</Navbar>
			<main className='homepage'>
				<Intro />
				<Login />
			</main>
		</>
	);
}
