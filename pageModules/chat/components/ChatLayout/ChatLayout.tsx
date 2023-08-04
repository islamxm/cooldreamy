import styles from './ChatLayout.module.scss';
import { Row, Col } from 'antd';
import Filter from '../Filter/Filter';
import ChatBody from '../ChatBody/ChatBody';
import ApiService from '@/service/apiService';
import {FC, useState, useEffect, useCallback, ChangeEvent} from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';
import moment from 'moment';
import notify from '@/helpers/notify';
import { sortingChatList, sortingDialogList } from '@/helpers/sorting';
import { useWindowSize } from 'usehooks-ts';
import { sortingMailChatList } from '@/helpers/sorting';
import Button from '@/components/Button/Button';
import {useDebounce} from 'usehooks-ts';
import socketEvents from '@/helpers/socketEvents';


const service = new ApiService()



const ChatLayout = () => {
    // !! глобальные инстанции
    const {width} = useWindowSize()
    const {query} = useRouter()
    const {token, socketChannel, newMessage, newMail} = useAppSelector(s => s)

    

    // ?? лоадер элементов чата
    const [loadSide, setLoadSide] = useState(false)
    const [loadMain, setLoadMain] = useState(false)

    const [loadedDialogs, setLoadedDialogs] = useState(false)


    // ?? ид текущего чата (опционально)
    const [currentChatId, setCurrentChatId] = useState<number>()
    const [currentUser, setCurrentUser] = useState<any>(null)

    // !! фильтры
    const [chatType, setChatType] = useState<'chat' | 'mail'>()
    const [filter, setFilter] = useState<'all' | 'unread' | 'favorite' | 'ignored' | any>('all')


    // !! данные
    const [dialogsList, setDialogsList] = useState<any[]>([])
    const [chatList, setChatList] = useState<any[]>([]) 

    const [dialogsPage, setDialogsPage] = useState<number>(1)
    const [chatListPage, setChatListPage] = useState(1)

    const [totalDialogItemCount, setTotalDialogItemCount] = useState(0)
    const [totalChatItemCount, setTotalChatItemCount] = useState(0)

    const [dialogSearch, setDialogSearch] = useState('')
    const dialogSearchDebounce = useDebounce<string>(dialogSearch, 500)

    // ?? получение ид текущего чата из роута (опционально)
    useEffect(() => {
        if(query) {
            if(query?.id && typeof query?.id === 'string') {
                setChatListPage(1)
                setCurrentChatId(Number(query?.id))
            }
        }

        if(query?.type === 'mail' || query?.type === 'chat') {
            setChatType(query?.type)
        }
    }, [query])




    // ** получение диалогов (чат лист)
    const getDialogs = () => {
        if(token) {
            if(dialogsPage === 1) {
                setLoadSide(true)
            }
            service.getChatList({
                filter: filter != 'all' ? filter : '',
                page: dialogsPage,
                search: dialogSearchDebounce
            }, token).then(res => {
                
                setTotalDialogItemCount(res?.total)
                if(dialogsPage === 1) {
                    setDialogsList(res?.data)
                } else {
                    setDialogsList(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoadSide(false)
                setLoadedDialogs(true)
            })
        }
    }


    // ** получение чата (конкретного)
    const getChat = () => {
        if(token) {
            if(currentChatId && chatListPage) {
                if(chatListPage === 1) {
                    setLoadMain(true)
                }
                service.getChat({
                    id: currentChatId,
                    page: chatListPage,
                    per_page: 10
                }, token).then(res => {
                    if(res?.another_user) {
                        setCurrentUser(res?.another_user)
                        setTotalChatItemCount(res?.chat_messages?.total)
                        if(chatListPage === 1) {
                            setChatList(res?.chat_messages?.data)
                        } else {
                            setChatList(s => [...s, ...res?.chat_messages?.data])
                        }
                    } else {
                        // !! НАПРАВЛЯЕМ НА СЛЕДУЮЩИЙ ДИАЛОГ ЕСЛИ ЕСТЬ, ЕСЛИ НЕТ ТО ПУСТОЙ ЧАТ
                        
                    }
                    
                }).finally(() => {
                    setLoadMain(false)
                })
            }
        }
    }


    const getMailDialogs = () => {
        if(token) {
            if(dialogsPage === 1) {
                setLoadSide(true)
            }
            service.getMailList({
                page: dialogsPage,
                per_page: 10,
                filter: filter != 'all' ? filter : '',
                
            }, token).then(res => {
       
                setTotalDialogItemCount(res?.total)
                if(dialogsPage === 1) {
                    setDialogsList(res?.data)
                } else {
                    setDialogsList(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoadSide(false)
                setLoadedDialogs(true)
            })
        }
    }



    // ** получение чата писем (конкрентного)
    const getMailChat = () => {
        if(token) {
            // service.getChatListFavorite().then(res => {})
            if(currentChatId && chatListPage) {
                if(chatListPage === 1) {
                    setLoadMain(true)
                }
                service.getMail({
                    id: currentChatId,
                    page: chatListPage,
                    per_page: 10
                }, token).then(res => {
                    
                    setCurrentUser(res?.another_user)
                    setTotalChatItemCount(res?.letter_messages?.total)
                    if(chatListPage === 1) {
                        setChatList(res?.letter_messages?.data)
                    } else {
                        setChatList(s => [...s, ...res?.letter_messages?.data])
                    }
                }).finally(() => {
                    setLoadMain(false)
                })
    
            }
        }
    }




    useEffect(() => {
        setDialogsPage(1)
        setChatListPage(1)
    }, [chatType])


    


    // ?? обновление списка диалогов (чат лист)
    useEffect(() => {
        if(chatType === 'chat') {
            getDialogs && getDialogs()
        }
        if(chatType === 'mail') {
            getMailDialogs && getMailDialogs()
        }
    }, [dialogsPage, token, chatType, filter, dialogSearchDebounce])


    // ?? обновление списка сообщений в чате
    useEffect(() => {
        if(chatType === 'chat') {
            getChat && getChat()
        }
        if(chatType === 'mail') {
            getMailChat && getMailChat()
        }
    }, [chatListPage, currentChatId, token, chatType])



   



    // сброс пагинации диалогов при смене фильтра
    useEffect(() => {
        setDialogsList([])
        setDialogsPage(1)
    }, [filter])


    useEffect(() => {
        if(token && currentChatId) {
            service.getChatMedia(token, currentChatId).then(res => {
              
            })
        }
    }, [token, currentChatId])


    // !! подписка на события по сокету
    useEffect(() => {
        if(socketChannel) {
            if(chatType === 'chat') {
                if(newMessage) { 
                    console.log(newMessage)
                    onUpdateChat && onUpdateChat({ 
                        messageBody: newMessage?.chat_message, 
                        dialogBody: {...newMessage?.chat_list_item, another_user: newMessage?.chat_message?.sender_user, self_user: newMessage?.chat_message?.recepient_user, last_message: newMessage?.chat_message}
                    })
                }
            }
            // if(chatType === 'mail') {
            //     if(newMail) {
            //         onUpdateChat && onUpdateChat({
            //             // messageBody: newMail?.letter_list_item?.letter?.last_message, 
            //             // dialogBody: newMail?.letter_list_item?.letter
            //             messageBody: newMail?.letter_message, 
            //             dialogBody: {...newMail?.letter_list_item, another_user: newMail?.chat_message?.sender_user, self_user: newMail?.chat_message?.recepient_user, last_message: newMail?.letter_message}
            //         }) 
            //     }
            // }
        }
    }, [socketChannel, currentChatId, chatType, newMessage, newMail])


    useEffect(() => {
        if(socketChannel) {
            socketChannel?.listen(socketEvents?.eventChatReadMessage, (data: any) => {
                if(chatType === 'chat') {
                    onUpdateChat && onUpdateChat({
                        messageBody: data?.chat_message, 
                        dialogBody: {...data?.chat_list_item, another_user: data?.chat_message?.recepient_user, self_user: data?.chat_message?.sender_user, last_message: data?.chat_message}
                    }, 'read')
                }
            })
            // socketChannel?.listen('.letter-message-read-event', (data: any) => {
            //     if(chatType === 'mail') {
            //         onUpdateChat && onUpdateChat({
            //             messageBody: data?.letter_message, 
            //             dialogBody: {...data?.letter_list_item, another_user: data?.letter_message?.sender_user, self_user: data?.letter_meesage?.recepient_user, last_message: data?.letter_message}
            //         }) 
            //     }
            // })
        }
    }, [chatType, socketChannel, chatList, dialogsList, currentChatId])


    const onDeleteDialog = (dialogId: number | string) => {
        if(dialogId && token) {
            service.deleteChat(token, Number(dialogId)).then(res => {
                if(res?.message === 'success') {
                    const foundDialog = dialogsList?.find(i => i.id == dialogId)
                    if(foundDialog) {
                        setDialogsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1)
                            return sortingDialogList([...m])
                        })
                    }
                } else {
                    notify('', 'ERROR')
                }
            })
        }

        if(dialogId) {
            const foundDialog = dialogsList?.find(i => i.id == dialogId)
            if(foundDialog) {
                setDialogsList(s => {
                    const m = s;
                    const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1)
                    return sortingDialogList([...m])
                })
            }
        }
    }


    const onUpdateChat = (body: {
        messageBody?: any,
        dialogBody?:any
    }, type: 'read' | 'new' = 'new') => {
        // ?? В САМОМ ЧАТЕ
        if(body?.dialogBody && body?.messageBody) {



            // TODO Если выбран ЧАТ
            if(chatType === 'chat') {
                if(type === 'read') {
                    if(chatList?.length > 0 && dialogsList?.length > 0) {
                        // ?? обновление чата
                        if(currentChatId == body?.dialogBody?.id) {   
                            const foundMessage = chatList?.find(s =>  s?.id == body?.messageBody?.id)
                            if(currentChatId == body?.dialogBody?.id) {
            
                                if(foundMessage) {
                                    setChatList(s => {
                                        const m = s;
                                        const rm = m.splice(m.findIndex(i => i.id == foundMessage?.id), 1, body?.messageBody)
                                        return sortingChatList([...m])
                                    })   
                                } 
                            }
                        }

                        // ?? обновление диалогов
                        const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
                        if(foundDialog) {
                            setDialogsList(s => {
                                const m = s;
                                const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                                return sortingDialogList([...m])
                            })
                        } else {
                            setDialogsList(s => {
                                return sortingDialogList([body?.dialogBody, ...s])
                            })
                        }
                    }
                    
                } else {
                    // ?? обновление чата
                    if(currentChatId == body?.dialogBody?.id) {
                                        
                                        
                        const foundMessage = chatList?.find(s =>  s?.id == body?.messageBody?.id)
                        if(currentChatId == body?.dialogBody?.id) {
                     
                            if(foundMessage) {
                                setChatList(s => {
                                    const m = s;
                                    const rm = m.splice(m.findIndex(i => i.id == foundMessage?.id), 1, body?.messageBody)
                                    return sortingChatList([...m])
                                })   
                            } else {
                                setChatList(s => {
                                    return sortingChatList([body?.messageBody, ...s])
                                })
                            }
                        }
                    }

                    // ?? обновление диалогов
                    const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
                    if(foundDialog) {
                        setDialogsList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                            return sortingDialogList([...m])
                        })
                    } else {
                        setDialogsList(s => {
                            return sortingDialogList([body?.dialogBody, ...s])
                        })
                    }
                }
                
            } 

            // TODO Если выбраны ПИСЬМА
            if(chatType === 'mail') {
                const foundLetter = chatList?.find(s => s?.id == body?.messageBody?.id)
                if(currentChatId == body?.dialogBody?.id) {
                    if(foundLetter) {
                        setChatList(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i.id == foundLetter?.id), 1, body?.messageBody)
                            return sortingMailChatList([...m])
                        })
                    } else {
                        setChatList(s => {
                            return sortingMailChatList([body?.messageBody, ...s])
                        })
                    }
                }

                const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
                if(foundDialog) {
                    setDialogsList(s => {
                        const m = s;
                        const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                        return sortingDialogList([...m])
                    })
                } else {
                    setDialogsList(s => {
                        return sortingDialogList([body?.dialogBody, ...s])
                    })
                }
            }
        } else {
            // !! НЕХВАТАЕТ ВХОДНЫХ ДАННЫХ
        }
    }

    


    return (
        <div className={styles.wrapper}>
            <Row>
                {
                    width <= 768 ? (
                        !currentChatId ? (
                            <Col span={24}>
                                <div className={styles.top}>
                                    <Filter
                                        activeFilter={filter}
                                        onFilterChange={setFilter}
                                        activeType={chatType}
                                        onTypeChange={setChatType}

                                        // tabsBadgeCount={}
                                        />
                                </div>
                            </Col>
                        ) : null
                    ) : (
                        <Col span={24}>
                            <div className={styles.top}>
                                <Filter
                                    activeFilter={filter}
                                    onFilterChange={setFilter}
                                    activeType={chatType}
                                    onTypeChange={setChatType}
                                    />
                            </div>
                        </Col>
                    )
                }
                <Col span={24}>
                    <div className={styles.main}>
                        <ChatBody
                            filter={filter}
                            chatList={chatList}
                            dialogsList={dialogsList}
                            activeDialogId={currentChatId}
                            totalChatItemCount={totalChatItemCount}
                            totalDialogItemCount={totalDialogItemCount}      

                            updateDialogsPage={setDialogsPage}
                            updateChatListPage={setChatListPage}
                            updateDialogsList={setDialogsList}
                                         

                            onUpdateChat={onUpdateChat}
                            // !!тестовый проп
                            
                            ChatType={chatType}
                            loadMain={loadMain}
                            loadSide={loadSide}

                            loadedDialogs={loadedDialogs}
                            currentUser={currentUser}

                            dialogSearch={dialogSearch}
                            setDialogSearch={setDialogSearch}
                            updateChatList={setChatList}
                            
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;