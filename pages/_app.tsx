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
import Loader from '@/components/ui-elements/Loader';
import BlobOne from '@/components/Homepage/svg/BlobOne';
import SvgLines from '@/components/Homepage/svg/SvgLines';
import GradientBg from '@/components/Homepage/svg/GradientBg';
import HeaderNew from '@/components/header/HeaderNew';
import SvgAbstractLines from '@/components/Homepage/svg/SvgLines';

export default function App({ Component, pageProps }: AppProps) {
	const [showConfetti, setShowConfetti] = useState(false);
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Add initial-load class to body element
		document.body.classList.add('initial-load');

		// Remove initial-load class from body element after 2 seconds
		const timeout = setTimeout(() => {
			document.body.classList.remove('initial-load');
		}, 2000);

		// Clean up the timeout on unmount
		return () => clearTimeout(timeout);
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
			<ToastContainer />
			<WipNotice />
			{/* <SvgLines /> */}
			{/* <SvgAbstractLines /> */}
			<div className='blob'>
				<BlobOne />
			</div>
			<HeaderNew />
			<div className={`main-content ${isLoading ? 'blur' : ''}`}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
