import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout/AppLayout';


export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header
				auth={true}
				/>
			<main>
				<Component {...pageProps} />
			</main>
			<Footer/>
		</>
		
	)
}
