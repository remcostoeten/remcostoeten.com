import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import { LocaleProvider } from '@/components/LocaleContext';
import { useEffect, useState } from 'react';
import WipNotice from '@/components/ui-elements/WipAlert';

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
				<WipNotice />
				<Component {...pageProps} />
			</LocaleProvider>
		</>
	);
}
