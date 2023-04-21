import '@/styles/globals.css';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
	return (
		<>
			<ToastContainer />
			<Header />
			<Component {...pageProps} />
		</>
	);
}
