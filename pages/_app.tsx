import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Router.events.on('routeChangeStart', () => {
	const loader = document.createElement('div');
	loader.classList.add('loader');
	const spinner = document.createElement('div');
	spinner.classList.add('spinner');
	loader.appendChild(spinner);
	document.body.appendChild(loader);
});

Router.events.on('routeChangeComplete', () => {
	const loader = document.querySelector('.loader');
	if (loader) {
		loader.remove();
	}
});

Router.events.on('routeChangeError', () => {
	const loader = document.querySelector('.loader');
	if (loader) {
		loader.remove();
	}
});

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
