import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout/AppLayout';
import {Provider} from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import store from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '@/hoc/CheckAuth';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import WcLoader from '@/components/WcLoader/WcLoader';
import { useRouter } from 'next/router';
import 'moment/locale/ru'
import moment from 'moment';


function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const [wc, setWc] = useState(true)

	


	useEffect(() => {
		moment.locale('ru')
		setWc(false)
	}, [])

	const routeChangeStart = (url: any) => {
		if(url === '/start' || url === '/') {
			setWc(true)
		}
	}
	const routeChangeEnd = (url: any) => {
		setWc(false)
	}



	useEffect(() => {
		if(router) {
			router.events.on('routeChangeStart', routeChangeStart)
			router.events.on('routeChangeComplete', routeChangeEnd)
		}

		return () => {
			router && router?.events?.off('routeChangeStart', routeChangeStart)
			router && router?.events?.off('routeChangeStart', routeChangeEnd)
		}
	},[router])
	
	

	return (
		<Provider store={store}>
			<ConfigProvider locale={ruRu}>
				<PrivateRoute>
					<MainWrapper>
							<AnimatePresence>
								{wc ? <WcLoader/> : null}
							</AnimatePresence>
							

							<ToastContainer/>
							<Header
								auth={true}
								/>
							<main>
								<Component {...pageProps} />
							</main>
							<Footer/>
						</MainWrapper>
				</PrivateRoute>
			</ConfigProvider>
			
		</Provider>
		
	)
}


export default App;