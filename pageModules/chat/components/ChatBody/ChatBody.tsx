import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useCallback, useEffect, useState } from 'react';
import Button from '@/components/Button/Button';
import testimg from '@/public/assets/images/test.jpg';
import Image from 'next/image';
import {FC} from 'react';
import { IDialogs, IChat } from '../../types';

import ChatStart from '../ChatStart/ChatStart';
import ChatMock from '../ChatMock/ChatMock';
import Gifts from '../Gifts/Gifts';
import Mail from '../Mail/Mail';
import Loader from '@/components/Loader/Loader';
import Router, { useRouter } from 'next/router';
import { sortingChatList, sortingDialogList } from '@/helpers/sorting';
import { useWindowSize } from 'usehooks-ts';
import IconButton from '@/components/IconButton/IconButton';
import {BiArrowBack} from 'react-icons/bi';
import Avatar from '@/components/Avatar/Avatar';

const service = new ApiService()



type ChatBodyComponentType = {
    ChatType?: 'mail' | 'chat'
    updateChat: (...args: any[]) => any,

    loadSide?: boolean,
    loadMain?: boolean,

    currentUser?: any
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

    // !! тестовый проп
    updateChat,
    ChatType,
    loadSide,
    loadMain,

    currentUser
}) => {
    const {width} = useWindowSize()
    const {query: {id}} = useRouter()
    const {token} = useAppSelector(s => s)
    const [pb, setPb] = useState<number>(70)

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


    const sendTextMessage = useCallback((text: string) => {
        if(text && activeDialogId && token && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_text({chat_id: Number(activeDialogId), text}, token).then(res => {
                    console.log(res)
                    updateDialogsList && updateDialogsList((s: any) => {
                        const m = s;
                        const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                        return sortingDialogList([...m])
                    })
                    updateChat(res?.chat?.last_message)
                    setMockType('')
                })
            }
            
        }
    }, [token, activeDialogId, updateChat, ChatType])
    


    const sendGiftMessage = useCallback((gifts: string) => {
        if(gifts && token && activeDialogId && ChatType) {
            if(ChatType === 'chat') {
                service.sendMessage_gift({chat_id: activeDialogId.toString(), gifts}, token).then(res => {
                
                    updateDialogsList && updateDialogsList((s: any) => {
                        const m = s;
                        const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                        return sortingDialogList([...m])
                    })
    
                    updateChat(res?.chat?.last_message)
                    setMockType('')
                })
            }
            
        }
    }, [token, activeDialogId, ChatType])
    

    
    
    



    return (
        <div className={styles.wrapper}>
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
                            {
                                loadSide ? (
                                    <Loader/>
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
                        {
                            loadSide ? (
                                <Loader/>
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
                    null
                ) : (
                    <div className={styles.main} >
                        {
                            ChatType === 'chat' ? (
                                
                                <div className={styles.body} style={{
                                    height: width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px)`
                                }}>
                                    {
                                        loadMain ? (
                                            <Loader/>
                                        ) : (
                                            chatList && chatList?.length > 0 ? (
                                                <Dialog
                                                    totalChatItemCount={totalChatItemCount}
                                                    height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px)`}
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
                                <div className={styles.body} style={{
                                    height: width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px)`
                                }}>
                                    {
                                        loadMain ? (
                                            <Loader/>
                                        ) : (
                                            chatList && chatList?.length > 0 ? (
                                                <Mail
                                                    height={width <= 768 ? `calc(100vh - 42px - ${pb}px)` : `calc(100vh - 165px - 75px - 50px - ${pb}px)`}
                                                    chatList={chatList}
                                                    id={activeDialogId}
                                                    updateChatListPage={updateChatListPage}
                                                    />
                                            ) : null
                                        )
                                    }
                                </div>
                            ) : null
                        }
                        

                        <div className={styles.action}>
                            <ChatAction 
                                getGifts={() => {
                                    if(mockType !== 'gift') {
                                        setMockType('gift')
                                    } else {
                                        setMockType('')
                                    }
                                }}
                                updateChat={updateChat}
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