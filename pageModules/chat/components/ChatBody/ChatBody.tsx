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

const service = new ApiService()



type ChatBodyComponentType = {
    ChatType?: 'mail' | 'chat'
    updateChat: (...args: any[]) => any,

    loadSide?: boolean,
    loadMain?: boolean
}


const ChatBody:FC<IDialogs & IChat & ChatBodyComponentType> = ({
    // для диалогов
    dialogsList,
    activeDialogId,
    updateDialogsPage,

    // для чата
    chatList,
    id,
    updateChatListPage,
    updateDialogsList,
    totalChatItemCount,
    totalDialogItemCount,

    // !! тестовый проп
    updateChat,
    ChatType,
    loadSide,
    loadMain
}) => {
    
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
        if(text && activeDialogId && token) {
            service.sendMessage_text({chat_id: Number(activeDialogId), text}, token).then(res => {
                console.log(res)
                updateDialogsList && updateDialogsList((s: any) => {
                    const m = s;
                    const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                    return [...m]
                })

                updateChat(res?.chat?.last_message)
                setMockType('')
            })
        }
    }, [token, activeDialogId, updateChat])
    


    const sendGiftMessage = useCallback((gifts: string) => {
        if(gifts && token && activeDialogId) {
            service.sendMessage_gift({chat_id: activeDialogId.toString(), gifts}, token).then(res => {
                
                updateDialogsList && updateDialogsList((s: any) => {
                    const m = s;
                    const rm = m.splice(m.findIndex((i: any) => i.id === res?.chat?.id), 1, res?.chat)
                    return [...m]
                })

                updateChat(res?.chat?.last_message)
                setMockType('')
            })
        }
    }, [token, activeDialogId])
    




    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                {
                    loadSide ? (
                        <Loader/>
                    ) : (
                        <ChatSide
                            updateDialogsPage={updateDialogsPage}
                            dialogsList={dialogsList}
                            activeDialogId={activeDialogId}
                            totalDialogItemCount={totalDialogItemCount}
                            /> 
                    )
                }
            </div>         
            <div className={styles.main} >
                {
                    ChatType === 'chat' ? (
                        
                        <div className={styles.body} style={{height: `calc(100vh - 165px - 75px - 50px - ${pb}px)`}}>
                            {
                                loadMain ? (
                                    <Loader/>
                                ) : (
                                    chatList && chatList?.length > 0 ? (
                                        <Dialog
                                            totalChatItemCount={totalChatItemCount}
                                            height={`calc(100vh - 165px - 75px - 50px - ${pb}px)`}
                                            chatList={chatList}
                                            id={id || activeDialogId}
                                            updateChatListPage={updateChatListPage}
                                            />
                                    ) : (
                                        activeDialogId && !mockType && !loadMain ? (
                                            <ChatStart
                                                onSelect={setMockType} 
                                                avatar={dialogsList?.find(i => i.id === activeDialogId)?.another_user?.avatar_url_thumbnail}/>
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
                        <div className={styles.mail} style={{height: `calc(100vh - 165px - 75px - 50px - ${pb}px)`}}>
                            {
                                loadMain ? (
                                    <Loader/>
                                ) : (
                                    chatList && chatList?.length > 0 ? (
                                        // <Dialog
                                        //     totalChatItemCount={totalChatItemCount}
                                        //     height={`calc(100vh - 165px - 75px - 50px - ${pb}px)`}
                                        //     chatList={chatList}
                                        //     id={id || activeDialogId}
                                        //     updateChatListPage={updateChatListPage}
                                        //     />
                                        <Mail
                                            height={`calc(100vh - 165px - 75px - 50px - ${pb}px)`}
                                            chatList={chatList}
                                            id={id || activeDialogId}
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
           
        </div>
    )
}

export default ChatBody;