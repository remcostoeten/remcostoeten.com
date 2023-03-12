import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}
