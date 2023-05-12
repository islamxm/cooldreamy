import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import { updateNewMail, updateNewMessage, updateCurrentProfileId, updateSocket, updateUserData } from '@/store/actions';
import notify from '@/helpers/notify';
import ApiService from '@/service/apiService';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import LinesEllipsis from 'react-lines-ellipsis';
import ProfileModal from '@/popups/ProfileModal/ProfileModal';

const service = new ApiService()


const MainWrapper = ({
    children
}: {children?: React.ReactNode}) => {
	const dispatch = useAppDispatch()
    const {token, userId, socketChannel, userData, currentProfileId} = useAppSelector(s => s);


	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)


	
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
		if(pusherConfig && userId && !socketChannel) {
			// if(socketChannel) {
			// 	socketChannel?.unsubscribe()
			// }
			const channels = getChannels(pusherConfig).private(`App.User.${userId}`);
			dispatch(updateSocket(channels))
			channels.subscribed(() => {
				notify('Соединение установлено', 'SUCCESS')
			})
		}
	}, [pusherConfig, userId, socketChannel])



	
	//new-chat-message-event
	//chat-message-read-event
	//new-letter-message-event
	//letter-message-read-event
	

	useEffect(() => {
		if(socketChannel) {
			//?? получение сообщений
            socketChannel?.listen('.new-chat-message-event', (data: any) => {
				dispatch(updateNewMessage(data))
				const avatar = data?.chat_list_item?.chat?.another_user?.avatar_url_thumbnail;
	
				switch(data?.chat_message?.chat_messageable_type) {
					case chatMessageTypeVariants.messageText:
						notify(<LinesEllipsis text={data?.chat_message?.chat_messageable?.text} maxLine={2}/>, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageGift:
						notify(`Вы получили подарок(${data?.chat_message?.chat_messageable?.gifts?.length})`, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageImage:
						notify('Фотография', 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageSticker:
						notify('Вы получили стикер', 'AVATAR', avatar)
						break;
					default:
						return notify(data?.chat_message?.chat_messageable_type, 'AVATAR', avatar)
				}
            })
			// socketChannel?.listen('.chat-message-read-event', (data: any) => {
				
			// })
			socketChannel?.listen('.new-letter-message-event', (data: any) => {
				dispatch(updateNewMail(data))
				const avatar = data?.letter_message?.sender_user?.avatar_url_thumbnail;
				if(data) {
					notify(
						<>
							Вы получили письмо
							{
								data?.letter_message?.letter_messageable?.text ? (
									<div style={{color: '#aaa', fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%'}}>{data?.letter_message?.letter_messageable?.text}</div>
								) : null
							}
							
						</>, 
						'AVATAR', 
						avatar)
				}
			})
			// socketChannel?.listen('.letter-message-read-event', (data: any) => {
			// 	console.log(data)
			// })
        }
	}, [socketChannel])




    return (
        <>
			<ProfileModal
				onCancel={() => dispatch(updateCurrentProfileId(null))}
				open={currentProfileId ? true : false}
				/>
            {children}
        </>
    )
}


export default MainWrapper;