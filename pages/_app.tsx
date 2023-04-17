import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout/AppLayout';
import {Provider} from 'react-redux';

import { useEffect, useState } from 'react';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';
import { useAppSelector } from '@/hooks/useTypesRedux';
import MainWrapper from '@/components/MainWrapper/MainWrapper';
import store from '@/store/store';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '@/hoc/CheckAuth';
import { ToastContainer } from 'react-toastify';



function App({ Component, pageProps }: AppProps) {

	
	

	return (
		<Provider store={store}>
			<PrivateRoute>
				<MainWrapper>
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
		</Provider>
		
	)
}


export default App;