import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import WiPAlert from '@/components/ui-elements/WipAlert';
import { LocaleProvider } from '@/components/LocaleContext';
import { useEffect, useState } from 'react';
import WipAlert from '@/components/ui-elements/WipAlert';
export default function App({ Component, pageProps }: AppProps) {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		const popupDisplayed = localStorage.getItem('popupDisplayed');
		if (!popupDisplayed) {
			setOpen(true);
			localStorage.setItem('popupDisplayed', 'true');
		}
	}, []);

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<LocaleProvider>
				<Component {...pageProps} />
				<WipAlert />
			</LocaleProvider>
		</>
	);
}
