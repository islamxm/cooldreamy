import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '@/styles/styles.scss';
import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout/AppLayout';
import {Provider} from 'react-redux';
import store from '@/store/store';
import { useEffect, useState } from 'react';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';


const pusherConfig: pusherConfigType = {
	key: 's3cr3t',
	wsHost: 'api.cooldreamy.com',
	authEndpoint: 'https://api.cooldreamy.com/broadcasting/auth',
	cluster: 'mt1',
	encrypted: true,
	forceTLS: false,
	wsPort: 6001,
	wssPort: 6001,
	disableStats: true,
	enabledTransports: ['ws', 'wss'],
	auth: {
		headers: {
			Authorization: 'Bearer ' + '13|aUEWVFEBmwEThyR7nKWUsbsE12NBd74SDFYcn94l',
		}
	}
}



export default function App({ Component, pageProps }: AppProps) {
	const [channels, setChannels] = useState<any>(null)

	// useEffect(() => {
	// 	const channels = getChannels(pusherConfig).private('App.User.304');
	// 	setChannels(channels)
	// }, [])

	

	// useEffect(() => {
	// 	channels && channels.listen('new-message-event', (e: any) => {
	// 		console.log(e)
	// 	})
	// }, [channels])



	return (
		<Provider store={store}>
			<Header
				auth={true}
				/>
			<main>
				<Component {...pageProps} />
			</main>
			<Footer/>
		</Provider>
		
	)
}
