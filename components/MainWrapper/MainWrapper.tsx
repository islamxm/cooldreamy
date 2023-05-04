import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import { updateSocket, updateUserData } from '@/store/actions';
import notify from '@/helpers/notify';
import ApiService from '@/service/apiService';



const service = new ApiService()


const MainWrapper = ({
    children
}: {children?: React.ReactNode}) => {
	const dispatch = useAppDispatch()
    const {token, userId, socketChannel, userData} = useAppSelector(s => s);

	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)

	useEffect(() => {
		console.log(userData)
	}, [userData])

	
	useEffect(() => {
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
			service.getMyProfile(token).then(res => {
				dispatch(updateUserData(res))
			})
		}
	}, [token])


	useEffect(() => {
		if(pusherConfig && userId) {
			if(socketChannel) {
				socketChannel?.unsubscribe()
			}
			const channels = getChannels(pusherConfig).private(`App.User.${userId}`);
			dispatch(updateSocket(channels))
			channels.subscribed(() => {
				notify('Соединение установлено', 'SUCCESS')
			})
		}
	}, [pusherConfig, userId])

	
	//new-chat-message-event
	//chat-message-read-event
	//new-letter-message-event
	//letter-message-read-event
	

	useEffect(() => {
		if(socketChannel) {
			//?? получение сообщений
            socketChannel?.listen('.new-chat-message-event', (data: any) => {
				console.log('socket', data)
				const avatar = data?.chat_list_item?.chat?.another_user?.avatar_url_thumbnail;

				switch(data?.chat_message?.chat_messageable_type) {
					case 'App\\Models\\ChatTextMessage':
						notify(data?.chat_message?.chat_messageable?.text, 'AVATAR', avatar)
						break;
					case "App\\Models\\ChatGiftMessage":
						notify(`Вы получили ${data?.chat_message?.chat_messageable?.gifts?.length} подарок`, 'AVATAR', avatar)
						break;
					default:
						return notify(data?.chat_message?.chat_messageable_type, 'AVATAR', avatar)
						break;
				}
            })
        }
	}, [socketChannel])



    return (
        <>
            {children}
        </>
    )
}


export default MainWrapper;