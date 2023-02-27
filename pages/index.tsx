import Head from 'next/head';
import Intro from '@/components/layout/Intro';
import Header from '@/components/header/Header';
export default function Home() {
	return (
		<>
			{' '}
			<Head>
				<title>remcostoeten</title>
				<meta
					content='remcostoeten.com, a dutch front-end developer.'
					name='description'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon/favicon.ico' />
			</Head>{' '}
			<div className='homepage'>
				<Intro />
			</div>
		</>
	);
}
