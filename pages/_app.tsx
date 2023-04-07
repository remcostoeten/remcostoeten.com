import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import { LocaleProvider } from '@/components/LocaleContext';
import { useEffect, useState } from 'react';
import WipNotice from '@/components/ui-elements/WipAlert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import Header from '@/components/header/Header';

export default function App({ Component, pageProps }: AppProps) {
	const [open, setOpen] = useState(true);
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		const popupDisplayed = localStorage.getItem('popupDisplayed');
		if (!popupDisplayed) {
			setOpen(true);
			localStorage.setItem('popupDisplayed', 'true');
		}
	}, []);

	return (
		<>
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					numberOfPieces={200}
				/>
			)}{' '}
			<ToastContainer />{' '}
			<LocaleProvider>
				<WipNotice />
				<Header setShowConfetti={setShowConfetti} />
				<Component {...pageProps} />
			</LocaleProvider>
		</>
	);
}
