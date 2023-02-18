import Head from 'next/head';
import { Navbar, Dropdown, Button, Link, Text } from '@nextui-org/react';
import Intro from '@/components/layout/Intro';
import UnderConstruction from '@/components/layout/UnderConstruction';
import { AcmeLogo } from './AcmeLogo';
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
						<Navbar.Link href='/Login'>Login</Navbar.Link>
					</Navbar.Content>
				</div>
			</Navbar>
			<main className='homepage'>
				<Intro />
			</main>
		</>
	);
}
