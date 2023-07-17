import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';
import { useAppDispatch, useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useCallback, useEffect, useState } from 'react';
import {FC} from 'react';
import { IDialogs, IChat } from '../../types';
import Input from '@/components/Input/Input';
import { FiSearch } from 'react-icons/fi';
import ChatStart from '../ChatStart/ChatStart';
import ChatMock from '../ChatMock/ChatMock';
import Gifts from '../Gifts/Gifts';
import Mail from '../Mail/Mail';
import Router, { useRouter } from 'next/router';
import { sortingDialogList } from '@/helpers/sorting';
import { useWindowSize } from 'usehooks-ts';
import IconButton from '@/components/IconButton/IconButton';
import {BiArrowBack} from 'react-icons/bi';
import Avatar from '@/components/Avatar/Avatar';
import DialogEmpty from '../DialogEmpty/DialogEmpty';
import {VscListSelection} from 'react-icons/vsc';
import SkeletonMail from '../Mail/components/SkeletonMail/SkeletonMail';
import SkeletonChatList from '../ChatList/components/SkeletonChatList/SkeletonChatList';
import { PulseLoader } from 'react-spinners';
import getPrice from '@/helpers/getPrice';
import { updateLimit } from '@/store/actions';
import { BsTrash } from 'react-icons/bs';
import PromptModal from '@/popups/PromptModal/PromptModal';
import notify from '@/helpers/notify';
import { Dropdown } from 'antd';
import ChatMenu from './components/ChatMenu/ChatMenu';
import ReportModal from '@/popups/ReportModal/ReportModal';



const service = new ApiService()



type ChatBodyComponentType = {
    ChatType?: 'mail' | 'chat'
    onUpdateChat: (...args: any[]) => any,

    loadSide?: boolean,
    loadMain?: boolean,

    loadedDialogs?: boolean

    currentUser?: any,

    dialogSearch?: string,
    setDialogSearch?: (...args: any[]) => any,

    filter: 'all' | 'unread' | 'favorite' | 'ignored'
}


const ChatBody:FC<IDialogs & IChat & ChatBodyComponentType> = ({
    // для диалогов
    dialogsList,
    activeDialogId,
    updateDialogsPage,

    // для чата
    chatList,

    updateChatListPage,
    updateDialogsList,
    totalChatItemCount,
    totalDialogItemCount,

    onUpdateChat,

    // !! тестовый проп
    ChatType,
    loadSide,
    loadMain,

    loadedDialogs,

    currentUser,

    dialogSearch,
    setDialogSearch,
    filter

}) => {
    const dispatch = useAppDispatch()
    const {width} = useWindowSize()
    const {query: {id}} = useRouter()
    const {token, actionsPricing, locale} = useAppSelector(s => s)
    const [pb, setPb] = useState<number>(70)
    const [promptModal, setPromptModal] = useState(false)
    const [reportModal, setReportModal] = useState(false)

    const [mockType, setMockType] = useState<'wink' | 'gift' | 'text' | ''>('')




    const switchMock = useCallback(() => {
        switch(mockType) {
            case 'gift':
                return <Gifts pb={pb} onSend={sendGiftMessage} onClose={() => setMockType('')}/>
            case 'text':
                return <ChatMock  onClose={() => setMockType('')} onSend={sendTextMessage}/>
            case 'wink':
                return null
            case '':
                return null
        }
    }, [mockType])


    const sendTextMessage = (text: string) => {
        if(text && activeDialogId && token && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_text({chat_id: Number(activeDialogId), text}, token).then(res => {
                    if(res?.error) {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                head: 'Вам не хватает кредитов...',
                                text: `К сожалению сообщение к ${currentUser?.name} 
                                не доставлено. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_CHAT_MESSAGE')}`
                            }
                        }))
                    } else {
                        onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                    }
                    setMockType('')
                })
            }
            if(ChatType === 'mail') {
                service.sendMail_text({text: text, letter_id: Number(activeDialogId)}, token).then(res => {
                    if(res?.error) {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                head: 'Вам не хватает кредитов...',
                                text: `К сожалению письмо к ${currentUser?.name} 
                                не доставлено. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_MAIL_MESSAGE')}`
                            }
                        }))
                    } else {
                        onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                    }
                    
                    setMockType('')
                })
            }
            
        }
    }


    const sendGiftMessage = (gifts: string) => {
        if(gifts && token && activeDialogId && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_gift({chat_id: activeDialogId.toString(), gifts}, token).then(res => {
                    if(res?.error) {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                head: 'Вам не хватает кредитов...',
                                text: `К сожалению подарок к ${currentUser?.name} не доставлен. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_CHAT_GIFT')}`
                            }
                        }))
                    } else {
                        onUpdateChat({messageBody: res?.chat?.last_message, dialogBody: res?.chat})
                    }
                   
                    setMockType('')
                })
            }
            if(ChatType === 'mail') {
                service.sendMail_gift({letter_id: activeDialogId.toString(), gifts}, token).then(res => {
                    if(res?.error) {
                        dispatch(updateLimit({
                            open: true,
                            data: {
                                head: 'Вам не хватает кредитов...',
                                text: `К сожалению подарок к ${currentUser?.name} не доставлен. Пополните баланс. Стоимость действия: ${getPrice(actionsPricing, 'SEND_MAIL_GIFT')}`
                            }
                        }))
                    } else {
                        onUpdateChat({messageBody: res?.letter?.last_message, dialogBody: res?.letter})
                    }
                    setMockType('')
                })
            }
        }
    }
    
    
    const onDeleteChat = () => {
        // if((id && typeof id === 'string') && token) {
        //     service.deleteChat(token, Number(id)).then(res => {
        //         console.log(res)
        //         if(res?.message === 'success') {
        //             updateDialogsList && updateDialogsList((s: any) => {
        //                 const m = s;
        //                 const rm = m.splice(m.findIndex((i: any) => i.id === id), 1)
        //                 return sortingDialogList([...m])
        //             })
        //             setPromptModal(true)
        //             notify(locale?.global?.notifications?.success_delete_chat, 'SUCCESS')
        //         } else {
        //             notify(locale?.global?.notifications?.error_default, 'ERROR')
        //         }
        //     })
        // }
    }


    const onGetAllMedia = () => {
        if(token && id && typeof id === 'string') {
            service.getChatMedia(token, id).then(res => {
                console.log(res)
            })
        }
    }

    const onWink = () => {
        if(token && currentUser?.id) {
            service.sendWink({user_id: Number(currentUser?.id)}, token).then(res => {
                console.log(res)
            })
        }
    }

    const onFav = () => {
        if(token && currentUser?.id) {
            service.addUserToFav({user_id: Number(currentUser?.id)}, token).then(res => {
                console.log(res)
            })
        }
    }

    const onIgnore = () => {
        if(token && currentUser?.id) {
            service.chatIgnore(token, {id: Number(currentUser?.id)}).then(res => {
                console.log(res)
            })
        }
    }


    const onReport = () => {
        setReportModal(true)
    }


    return (
        <div className={styles.wrapper}>
            <ReportModal
                open={reportModal}
                chatId={Number(id)}
                onCancel={() => setReportModal(false)}
                />
            <PromptModal
                open={promptModal}
                onCancel={() => setPromptModal(false)}
                text='Желаете удалить диалог?'
                onAccept={onDeleteChat}
                />
            {
                width <= 768 && id ? (
                    <div className={styles.bc}>
                        <div className={styles.back}>
                            <IconButton
                                onClick={() => Router.back()}
                                variant={'transparent'}
                                size={30}
                                icon={<BiArrowBack color={'#000'} size={20}/>}
                                />
                        </div>
                        <div className={styles.main}>
                            {currentUser?.name}
                        </div>
                        <div className={styles.avatar}>
                            <Avatar
                                image={currentUser?.avatar_url_thumbnail} 
                                round 
                                size={30}/>
                        </div>
                    </div>
                ) : null
            }
            {
                width <= 768 ? (
                    !id ? (
                        <div className={styles.sidebar}>
                            <div className={styles.search}>
                                <Input
                                    style={{
                                        borderRadius: 8,
                                        paddingTop: 5,
                                        paddingBottom: 5,
                                    }}
                                    placeholder={`...${locale?.chatPage.search}`}
                                    afterIcon={<FiSearch color='#888888'/>}
                                    value={dialogSearch}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDialogSearch && setDialogSearch(e.target.value)}
                                    />
                            </div>
                            {
                                loadSide ? (
                                    <SkeletonChatList/>
                                ) : (
                                    <ChatSide
                                        updateDialogsPage={updateDialogsPage}
                                        updateDialogsList={updateDialogsList}
                                        dialogsList={dialogsList}
                                        activeDialogId={activeDialogId}
                                        totalDialogItemCount={totalDialogItemCount}
                                        /> 
                                )
                            }
                        </div> 
                    ) : null
                ) : (
                    <div className={styles.sidebar}>
                        <div className={styles.search}>
                            <Input
                                style={{
                                    borderRadius: 8,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                }}
                                placeholder={`...${locale?.chatPage.search}`}
                                afterIcon={<FiSearch color='#888888'/>}
                                value={dialogSearch}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDialogSearch && setDialogSearch(e.target.value)}
                                />
                        </div>
                        {
                            loadSide ? (
                                <SkeletonChatList/>
                            ) : (
                                <ChatSide
                                    updateDialogsList={updateDialogsList}
                                    updateDialogsPage={updateDialogsPage}
                                    dialogsList={dialogsList}
                                    activeDialogId={activeDialogId}
                                    totalDialogItemCount={totalDialogItemCount}
                                    /> 
                            )
                        }
                    </div> 
                )
            }
            {
                width <= 768 && !id ? (
                    
                        !id && loadedDialogs && dialogsList?.length === 0 ? (
                            <div className={styles.main}>
                                <DialogEmpty height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}/>
                            </div>
                        ) : null
                    
                ) : (
                    
                    <div className={styles.main}>
                        {
                            !id && loadedDialogs && dialogsList?.length === 0 ? (
                                <DialogEmpty absolute height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}/>
                            ) : null
                        }
                        {
                            ChatType === 'chat' ? (
                                <div className={styles.body} style={{
                                    height: width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`
                                }}>
                                    {
                                        id && (
                                            <div className={styles.body_action}>
                                                <div className={styles.body_action_item}>
                                                    <IconButton
                                                        onClick={() => setPromptModal(true)}
                                                        icon={<BsTrash/>}
                                                        size={35}
                                                        variant={'bordered'}
                                                        style={{border: 'none', color: '#888888'}}
                                                        />
                                                </div>
                                                <div className={styles.body_action_item}>
                                                    <Dropdown
                                                        overlay={
                                                            <ChatMenu
                                                                onWink={onWink}
                                                                onGetAllMedia={onGetAllMedia}
                                                                onFav={onFav}
                                                                onIgnore={onIgnore}
                                                                onReport={onReport}
                                                                />
                                                        }
                                                        trigger={['click']}
                                                        >
                                                        <IconButton
                                                            icon={<VscListSelection/>}
                                                            size={35}
                                                            style={{borderRadius: '11px', borderColor: 'rgba(104, 98, 237, 0.21)'}}
                                                            variant={'bordered'}
                                                            />
                                                    </Dropdown>

                                                </div>
                                            </div>
                                        )
                                    }


                                    {
                                        loadMain ? (
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}><PulseLoader color='var(--violet)'/></div>
                                            
                                        ) : (
                                            chatList && chatList?.length > 0 ? (
                                                <Dialog
                                                    totalChatItemCount={totalChatItemCount}
                                                    height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px) + 50px`}
                                                    chatList={chatList}
                                                    id={activeDialogId}
                                                    updateChatListPage={updateChatListPage}
                                                    />
                                            ) : (
                                                activeDialogId && !mockType ? (
                                                    <ChatStart
                                                        onSelect={setMockType} 
                                                        avatar={currentUser?.avatar_url_thumbnail}/>
                                                ) : null
                                            )
                                        )
                                    }
                                    {
                                        switchMock()
                                    }
                                </div>
                            ) : null    
                        }
                        {
                            ChatType === 'mail' ? (
                                <div className={styles.mail} style={{
                                    height: width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`
                                }}>
                                    {
                                        loadMain ? (
                                            <SkeletonMail/>
                                        ) : (
                                            chatList && chatList?.length > 0 ? (
                                                <Mail
                                                    height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px + 50px)`}
                                                    chatList={chatList}
                                                    id={activeDialogId}
                                                    updateChatListPage={updateChatListPage}
                                                    totalChatItemCount={totalChatItemCount}
                                                    />
                                            ) : (
                                                // activeDialogId && !mockType ? (
                                                //     <ChatStart
                                                //         onSelect={setMockType} 
                                                //         avatar={currentUser?.avatar_url_thumbnail}/>
                                                // ) : null
                                                null
                                            )
                                        )
                                    }
                                    {
                                        switchMock()
                                    }
                                </div>
                            ) : null
                        }
                        <div className={styles.action}>
                            <ChatAction 
                                currentUser={currentUser}
                                getGifts={() => {
                                    if(mockType !== 'gift') {
                                        setMockType('gift')
                                    } else {
                                        setMockType('')
                                    }
                                }}
                                onUpdateChat={onUpdateChat}
                                setHeight={setPb}
                                updateDialogsList={updateDialogsList}
                                />
                        </div>
                    </div>          
                )
            }      
             
           
        </div>
    )
}

export default ChatBody;