import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Intro from '@/components/layout/Intro';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
