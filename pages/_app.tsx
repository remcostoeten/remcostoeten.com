import '@/styles/styles.css';
import Header from '@/components/header/Header';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
}
