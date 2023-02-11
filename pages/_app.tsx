import Header from '@/components/Header/Header';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'



export default function App({ Component, pageProps }: AppProps) {
	return (
		<main>
			<Header
				auth={true}
				/>
			<Component {...pageProps} />
		</main>
	)
}
