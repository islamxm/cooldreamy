import styles from './ChatLayout.module.scss';
import { Row, Col } from 'antd';
import Filter from '../Filter/Filter';
import ChatBody from '../ChatBody/ChatBody';
import ApiService from '@/service/apiService';
import {FC, useState, useEffect, useCallback, ChangeEvent} from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()



const ChatLayout = () => {
    // !! глобальные инстанции
    const {query} = useRouter()
    const {token, socketChannel} = useAppSelector(s => s)






    // ?? ид текущего чата (опционально)
    const [currentChatId, setCurrentChatId] = useState<number>()

    // !! фильтры
    const [chatType, setChatType] = useState<'chat' | 'mail'>('chat')


    // !! данные
    const [dialogsList, setDialogsList] = useState<any[]>([])
    const [chatList, setChatList] = useState<any[]>([]) 

    const [dialogsPage, setDialogsPage] = useState<number>(1)
    const [chatListPage, setChatListPage] = useState(1)

    const [totalDialogItemCount, setTotalDialogItemCount] = useState(0)
    const [totalChatItemCount, setTotalChatItemCount] = useState(0)

    // ?? получение ид текущего чата из роута (опционально)
    useEffect(() => {
        
        if(query?.id && typeof query?.id === 'string') {
            setChatListPage(1)
            setCurrentChatId(Number(query?.id))
        }
    }, [query])


    useEffect(() => console.log(token), [token])


    // ** получение диалогов (чат лист)
    const getDialogs = () => {
        if(token) {
            service.getChatList({
                page: dialogsPage,
            }, token).then(res => {
                setTotalDialogItemCount(res?.total)
                if(dialogsPage === 1) {
                    setDialogsList(res?.data)
                } else {
                    setDialogsList(s => [...s, ...res?.data])
                }
            })
        }
       
    }


    // ** получение чата (конкретного)
    const getChat = () => {
        if(token) {
            if(currentChatId && chatListPage) {
            
                service.getChat({
                    id: currentChatId,
                    page: chatListPage,
                    per_page: 10
                }, token).then(res => {
                    setTotalChatItemCount(res?.chat_messages?.total)
                    if(chatListPage === 1) {
                        setChatList(res?.chat_messages?.data)
                    } else {
                        setChatList(s => [...s, ...res?.chat_messages?.data])
                    }
                })
    
            }
        }
        
    }


    // ?? обновление списка диалогов (чат лист)
    useEffect(() => {
        getDialogs()
    }, [dialogsPage, token])


    // ?? обновление списка сообщений в чате
    useEffect(() => {
        getChat()
    }, [chatListPage, currentChatId, token])




    // !! тестовая функция для обновления чата
    const updateChat = () => {
        getChat()
    }



    // !! подписка на события по сокету
    useEffect(() => {
        if(socketChannel) {
            socketChannel?.listen('.new-chat-message-event', (data: any) => {
                console.log(data)
                
                setDialogsList(s => {
                    const m = s;
                    const rm = m.splice(m.findIndex((i: any) => i.id === data?.chat_list_item?.chat?.id), 1, data?.chat_list_item?.chat)
                    return [...m]
                })

                if(currentChatId && currentChatId == data?.chat_list_item?.chat?.id) {
                    setChatList(s => {
                        return [data?.chat_message, ...s]
                    })
                }
            })
        }
    }, [socketChannel, currentChatId])


    return (
        <div className={styles.wrapper}>
            <Row>
                <Col span={24}>
                    <div className={styles.top}>
                        <Filter
                            activeType={chatType}
                            onTypeChange={setChatType}
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.main}>
                        <ChatBody
                            chatList={chatList}
                            dialogsList={dialogsList}
                            activeDialogId={currentChatId}
                            totalChatItemCount={totalChatItemCount}
                            totalDialogItemCount={totalDialogItemCount}      

                            updateDialogsPage={setDialogsPage}
                            updateChatListPage={setChatListPage}
                            updateDialogsList={setDialogsList}
                                         


                            // !!тестовый проп
                            updateChat={() => {}}
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;