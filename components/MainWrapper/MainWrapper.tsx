import {useState, useEffect} from 'react';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';

const MainWrapper = ({
    children
}: {children?: React.ReactNode}) => {

    const {token} = useAppSelector(s => s);

    const [channels, setChannels] = useState<any>(null)
	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)

	useEffect(() => {
        console.log(token)
		if(token) {
            
			setPusherConfig(
				{
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
							Authorization: 'Bearer ' + token,
						}
					}
				}
			)
		}
	}, [token])


	useEffect(() => {
		if(pusherConfig) {
			const channels = getChannels(pusherConfig).private('App.User.305');
			setChannels(channels)
		}
		
	}, [pusherConfig])

	
	//new-chat-message-event
	//chat-message-read-event
	//new-letter-message-event
	//letter-message-read-event
	useEffect(() => {
		// channels && channels.listen('.new-letter-message-event', (e: any) => {
		// 	console.log(e)
		// })
	}, [channels])

    return (
        <>
            {children}
        </>
    )
}


export default MainWrapper;