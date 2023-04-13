import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import WipNotice from '@/components/ui-elements/WipAlert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { useRouter } from 'next/router';
import { Router } from 'next/router';
import LoadingScreen from '@/components/ui-elements/LoadingScreen';
import Header from '@/components/header/Header';
import Loader from '@/components/ui-elements/Loader';

export default function App({ Component, pageProps }: AppProps) {
	const [showConfetti, setShowConfetti] = useState(false);
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	Router.events.on('routeChangeStart', () => {
		setIsLoading(true);
	});

	Router.events.on('routeChangeComplete', () => {
		setIsLoading(false);
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 20000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const popupDisplayed = localStorage.getItem('popupDisplayed');
		if (!popupDisplayed) {
			setOpen(true);
			localStorage.setItem('popupDisplayed', 'true');
		}
	}, []);

	return (
		<>
			<Loader isLoading={isLoading} />
			{showConfetti && (
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					numberOfPieces={200}
				/>
			)}
			<ToastContainer /> <WipNotice />
			<div className={`main-content ${isLoading ? 'blur' : ''}`}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
