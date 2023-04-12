import '@/styles/styles.css';
import type { AppProps } from 'next/app';
import { LocaleProvider } from '@/components/LocaleContext';
import { useEffect, useState } from 'react';
import WipNotice from '@/components/ui-elements/WipAlert';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import Header from '@/components/header/Header';
import { useRouter } from 'next/router';
import AsideSmall from '@/components/Task/AsideSmall';

export default function App({ Component, pageProps }: AppProps) {
	const [showConfetti, setShowConfetti] = useState(false);
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const showHeader = router.pathname !== '/tasks';

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
			)}
			<ToastContainer /> <WipNotice />
			{/* <div className='wrapper'> */}
			{/* <div className='wrapper__aside'> */}
			{/* <AsideSmall vi/>sew={''} isLoggedIn={false} /> */}
			{/* </div> */}
			{/* <div className='wrapper__main'> */}
			<Component {...pageProps} setShowConfetti={setShowConfetti} />
			{/* </div> */}
			{/* </div> */}
		</>
	);
}
