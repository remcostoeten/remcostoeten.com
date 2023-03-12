import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect, useState } from 'react';

const Loader = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const startLoading = () => setIsLoading(true);
		const endLoading = () => setIsLoading(false);

		Router.events.on('routeChangeStart', startLoading);
		Router.events.on('routeChangeComplete', endLoading);
		Router.events.on('routeChangeError', endLoading);

		return () => {
			Router.events.off('routeChangeStart', startLoading);
			Router.events.off('routeChangeComplete', endLoading);
			Router.events.off('routeChangeError', endLoading);
		};
	}, []);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isLoading) {
			timer = setTimeout(() => {
				const loader = document.querySelector('.loader');
				if (loader) {
					loader.remove();
				}
			}, 1000);
		}
		return () => clearTimeout(timer);
	}, [isLoading]);

	return (
		<div className={`loader${isLoading ? ' show' : ''}`}>
			<div className='backdrop'></div>
			<div className='spinner'></div>
		</div>
	);
};

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Loader />
			<Component {...pageProps} />
		</>
	);
}
