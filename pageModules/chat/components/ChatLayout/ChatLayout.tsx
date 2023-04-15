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
    const {token} = useAppSelector(s => s)






    // ?? ид текущего чата (опционально)
    const [currentChatId, setCurrentChatId] = useState<number>()

    // !! фильтры
    const [chatType, setChatType] = useState<'chat' | 'mail'>('chat')


    // !! данные
    const [dialogsList, setDialogsList] = useState<any[]>([])
    const [chatList, setChatList] = useState<any[]>([]) 

    const [dialogsPage, setDialogsPage] = useState<number>(1)
    const [chatListPage, setChatListPage] = useState(1)


    // ?? получение ид текущего чата из роута (опционально)
    useEffect(() => {
        
        if(query?.id && typeof query?.id === 'string') {
            setChatListPage(1)
            setCurrentChatId(Number(query?.id))
        }
    }, [query])



    // ** получение диалогов (чат лист)
    const getDialogs = () => {
        if(token) {
            service.getChatList({
                page: dialogsPage,
            }, token).then(res => {
                console.log(res)
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
                    console.log(res)
    
                    if(chatListPage === 1) {
                        setChatList(res?.chat_messages?.data)
                    } else {
                        setChatList(s => [...s, ...res?.chat_messages?.data])
                    }
                })
    
            }
        }
        
    }

    // ** отправка сообщения (текст, медиа, гифт, подмигивание)
    const sendMessage = (payload: any, type: string) => {
        if(payload) {
            switch(type) {

            }
        }
    }


    // ** заливка медиа файла
    const uploadMedia = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)
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
                            updateDialogsPage={setDialogsPage}
                            dialogsList={dialogsList}
                            activeDialogId={currentChatId}
                            updateChatListPage={setChatListPage}
                            chatList={chatList}

                            // !!тестовый проп
                            updateChat={updateChat}
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;