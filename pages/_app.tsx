import '../styles/styles.css';
import type { AppProps } from 'next/app';
import MainLayout from '@/components/layout/MainLayout';
import MyThemeContextProvider from '@/components/layout/MyThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MyThemeContextProvider>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</MyThemeContextProvider>
	);
}

export default MyApp;
