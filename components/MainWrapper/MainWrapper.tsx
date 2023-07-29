import {useState, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import { pusherConfigType } from '@/helpers/getChannels';
import getChannels from '@/helpers/getChannels';
import Pusher from 'pusher-js';
import { updateNewMail, updateNewMessage, updateCurrentProfileId, updateSocket, updateUserData, updateUnreadChatCount, updateSoonModal } from '@/store/actions';
import notify from '@/helpers/notify';
import ApiService from '@/service/apiService';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import LinesEllipsis from 'react-lines-ellipsis';
import ProfileModal from '@/popups/ProfileModal/ProfileModal';
import { useRouter } from 'next/router';
import { updateLocale, updatePricing, updateLimit } from '@/store/actions';
import ru from '@/locales/ru';
import en from '@/locales/en';
import LimitModal from '@/popups/LimitModal/LimitModal';
import SoonModal from '@/popups/SoonModal/SoonModal';
import { BASE_DOMAIN, BASE_WS_HOST, TEST_DOMAIN, TEST_WS_HOST } from '@/service/endpoints';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';


const service = new ApiService()


const MainWrapper = ({
    children
}: {children?: React.ReactNode}) => {
	const {locale, pathname, push, asPath, query} = useRouter()
	const dispatch = useAppDispatch()
    const {token, userId, socketChannel, userData, currentProfileId, limit, unreadChatCount, newMessage, newMail, soonModal} = useAppSelector(s => s);
	const lc = useAppSelector(s => s.locale)

	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)
	

	useEffect(() => {
		if(token && query && typeof query?.token === 'string') {
			service.verifyEmail(token, query?.token).then(res => {
				if(res === 200) {
					notify(lc?.global?.notifications?.success_email_verify, 'SUCCESS')
					service.getMyProfile(token).then(userData => {
						dispatch(updateUserData(userData))
					})
				} else {
					notify(lc?.global?.notifications?.error_email_verify, 'ERROR')
				}
			})
		}
	}, [token, query])


	useEffect(() => {
		if(locale === 'ru') {
			dispatch(updateLocale(ru))
		}
		if(locale === 'en') {
			dispatch(updateLocale(en))
		}
	}, [locale])


	useEffect(() => {
		if(window?.navigator?.language) {
			if(window?.navigator?.language === 'ru') {
				if(asPath) {
					// push(asPath, undefined, {locale: 'ru'})
					push(asPath, undefined, {locale: 'en'})
				}
			} else {
				if(asPath) {
					push(asPath, undefined, {locale: 'en'})
				}
			}
		}
	}, [])

	
	useEffect(() => {
		if(token) {
			setPusherConfig(
				{
					key: 's3cr3t',
					// api.cooldreamy.com
					wsHost: BASE_WS_HOST,
					authEndpoint: BASE_DOMAIN + 'broadcasting/auth',
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
				console.log(res)
			})
			service.getActionPricing(token).then(res => {
				dispatch(updatePricing(res))
			})
		}
	}, [token])



	useEffect(() => {
		if(pusherConfig && userId && !socketChannel) {
			const channels = getChannels(pusherConfig).private(`App.User.${userId}`);
			dispatch(updateSocket(channels))
			channels.subscribed(() => {
				notify(lc?.global?.notifications?.success_socket, 'SUCCESS')
			})
			channels?.error(() => {
				notify(lc?.global?.notifications?.error_socket, 'ERROR')
			})
		}
	}, [pusherConfig, userId, socketChannel])

	useEffect(() => {
		if(token) {
			service.getUnreadCount(token).then(res => {
				dispatch(updateUnreadChatCount(res?.count_chat_messages))
				
				
				//count_letter_messages
			})
		}
	}, [token])



	
	//new-chat-message-event
	//chat-message-read-event
	//new-letter-message-event
	//letter-message-read-event

	useEffect(() => {
		if(newMessage) {
			dispatch(updateUnreadChatCount(unreadChatCount + 1))
		}
	}, [newMessage])
	

	useEffect(() => {
		if(socketChannel) {
			//?? получение сообщений
            socketChannel?.listen('.new-chat-message-event', (data: any) => {
				dispatch(updateNewMessage(data))
				// dispatch(updateUnreadChatCount(unreadChatCount + 1))
				const avatar = data?.chat_message?.sender_user?.user_avatar_url;
				switch(data?.chat_message?.chat_messageable_type) {
					case chatMessageTypeVariants.messageText:
						notify(<LinesEllipsis text={data?.chat_message?.chat_messageable?.text} maxLine={2}/>, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageGift:
						notify(`${lc?.global?.notifications?.get_gift}(${data?.chat_message?.chat_messageable?.gifts?.length})`, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageImage:
						notify(lc?.global?.notifications?.get_pic, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageSticker:
						notify(lc?.global?.notifications?.get_sticker, 'AVATAR', avatar)
						break;
					case chatMessageTypeVariants.messageWink:
						notify(lc?.global?.notifications?.get_wink, 'AVATAR', avatar)
					default:
						// return notify(data?.chat_message?.chat_messageable_type, 'AVATAR', avatar)
						return null
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
        }
	}, [socketChannel])


	
	const test = () => {
		if(token) {
			service.createChat({user_id: 50324}, token).then(res => {
				console.log(res)
			})
		}
	}


    return (
        <>
			<LimitModal
				open={limit?.open}
				head={limit?.data?.head}
				text={limit?.data?.text}
				action={{
					label: limit?.data?.action?.label,
					link: limit?.data?.action?.link
				}}
				onCancel={() => dispatch(updateLimit({open: false}))}
				/>
			<ProfileModal
				onCancel={() => dispatch(updateCurrentProfileId(null))}
				open={currentProfileId ? true : false}
				/>
			<SoonModal
				open={soonModal}
				onCancel={() => dispatch(updateSoonModal(false))}
				/>
			{/* <div style={{marginTop: 100}}><Button
				text='adsadasdas'
				onClick={test}
				/></div> */}
            {children}
			{/* <Navbar/> */}
        </>
    )
}


export default MainWrapper;