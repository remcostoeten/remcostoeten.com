import '@/styles/globals.css';
import '@/styles/styles.css';
import Header from '../components/Header/Header';
export default function App({ Component, pageProps }) {
	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	);
}
