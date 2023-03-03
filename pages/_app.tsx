import '@/styles/styles.css';
import Header from '@/components/header/Header';
<link
	rel='stylesheet'
	href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
/>;
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<main className='container'>
				<Component {...pageProps} />
			</main>
		</>
	);
}
