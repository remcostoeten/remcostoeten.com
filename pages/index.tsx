import Head from 'next/head';
import { Navbar, Dropdown, Button, Link, Text } from '@nextui-org/react';
import Intro from '@/components/layout/Intro';
import UnderConstruction from '@/components/layout/UnderConstruction';
import Header from '@/components/header/Header';
export default function Home() {
	return (
		<>
			{' '}
			<Head>
				<title>remcostoeten</title>
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
			<Header />
			<main className='homepage'>
				<Intro />
			</main>
		</>
	);
}
