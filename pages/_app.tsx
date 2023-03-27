import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { LocaleProvider } from '@/components/LocaleContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<LocaleProvider>
				<ToastContainer />
				<Component {...pageProps} />
			</LocaleProvider>
		</>
	);
}
