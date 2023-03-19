import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { LocaleProvider } from '@/components/LocaleContext';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<LocaleProvider>
				<Component {...pageProps} />
			</LocaleProvider>
		</>
	);
}
