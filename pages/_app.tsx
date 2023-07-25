import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import 'swiper/css';
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
import enUs from 'antd/locale/en_US'
import WcLoader from '@/components/WcLoader/WcLoader';
import { useRouter } from 'next/router';
import 'moment/locale/ru'
import moment from 'moment';
import { useWindowSize } from 'usehooks-ts';




if(process?.browser) {
	const vh = process?.browser && window.innerHeight / 100;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
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
							<!-- Start of LiveChat (www.livechat.com) code -->
							<script>
								window.__lc = window.__lc || {};
								window.__lc.license = 15765117;
								;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
							</script>
							<noscript><a href="https://www.livechat.com/chat-with/15765117/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
							<!-- End of LiveChat code -->

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