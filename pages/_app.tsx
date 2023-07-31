import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import 'swiper/css';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout/AppLayout';
import {Provider} from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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
import enUs from 'antd/locale/en_US'
import WcLoader from '@/components/WcLoader/WcLoader';
import { useRouter } from 'next/router';
import 'moment/locale/ru'
import moment from 'moment';
import { useWindowSize } from 'usehooks-ts';



if(process?.browser) {
	const vh = process?.browser && window.innerHeight / 100;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	var newscript = document.createElement('script');
	newscript.src = 'https://mc.yandex.ru/metrika/tag.js';
	document.head.appendChild(newscript);

	var div = document.createElement("div");
	var script = document.createElement('script');
	script.async = true;
	script.onload = function () {
		(window.ym || function () {})(
			94454907,
			'init',
			{
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
				webvisor: true,
				ecommerce: 'dataLayer'
			}
		);
	};

	document.head.appendChild(script);

// Создаем элемент img и задаем атрибуты
	var img = document.createElement("img");
	img.src = "https://mc.yandex.ru/watch/94454907";
	img.style.position = "absolute";
	img.style.left = "-9999px";
	img.alt = "";

// Добавляем img внутрь div
	div.appendChild(img);
	div.appendChild(script);
// Добавляем div на страницу
	document.body.appendChild(div);
}


function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const {locale} = router
	const [wc, setWc] = useState(true)
	const {width} = useWindowSize()
	


	useEffect(() => {
		moment.locale(locale === 'ru' ? 'ru' : 'en')
		setWc(false)
	}, [locale])

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


	useEffect(() => {
		if(router?.pathname === '/unavailable') {
			document.body.classList.add('unavailable')
		} else {
			document.body.classList.remove('unavailable')
		}
	}, [router])

	return (
		<Provider store={store}>
			<ConfigProvider locale={locale === 'ru' ? ruRu : enUs}>
				<PrivateRoute>
					<MainWrapper>
							<AnimatePresence>
								{wc ? <WcLoader/> : null}
							</AnimatePresence>
							

							<ToastContainer/>
							{
								width <= 768 && router?.pathname?.includes('/chat') && router?.query?.id ? (
									null
								) : (
									router?.pathname === '/unavailable' ? null : <Header auth={true}/>
								)
							}

							<main>
								<Component {...pageProps} />
							</main>
							{
								width <= 768 && router?.pathname?.includes('/chat') ? (
									null
								) : (
									router?.pathname === '/unavailable' ? null : <Footer/>
								)
							}
						</MainWrapper>
				</PrivateRoute>
			</ConfigProvider>

		</Provider>

	)
}


export default App;