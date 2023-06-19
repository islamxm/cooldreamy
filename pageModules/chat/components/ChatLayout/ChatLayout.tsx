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


const service = new ApiService()



const ChatLayout = () => {
    // !! глобальные инстанции
    const {width} = useWindowSize()
    const {query, push, locale, asPath} = useRouter()
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
    const [filter, setFilter] = useState('all')


    // !! данные
    const [dialogsList, setDialogsList] = useState<any[]>([])
    const [chatList, setChatList] = useState<any[]>([]) 

    const [dialogsPage, setDialogsPage] = useState<number>(1)
    const [chatListPage, setChatListPage] = useState(1)

    const [totalDialogItemCount, setTotalDialogItemCount] = useState(0)
    const [totalChatItemCount, setTotalChatItemCount] = useState(0)


    const [listening, setListening] = useState(false)


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
                    setCurrentUser(res?.another_user)
                    setTotalChatItemCount(res?.chat_messages?.total)
                    if(chatListPage === 1) {
                        setChatList(res?.chat_messages?.data)
                    } else {
                        setChatList(s => [...s, ...res?.chat_messages?.data])
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
                per_page: 10
            }, token).then(res => {
                console.log(res)
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
                    console.log(res)
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
    }, [dialogsPage, token, chatType, filter])


    // ?? обновление списка сообщений в чате
    useEffect(() => {
        if(chatType === 'chat') {
            getChat && getChat()
        }
        if(chatType === 'mail') {
            getMailChat && getMailChat()
        }
    }, [chatListPage, currentChatId, token, chatType])



    // ?? обновление чата
    const updateChat = useCallback((item: any) => {
        if(chatType === 'chat') {
            setChatList(s => {
                const sender_user = s.find(i => i.sender_user?.id === item.sender_user_id)?.sender_user
                if(sender_user) {
                    return sortingChatList([{...item, sender_user}, ...s])
                } else return sortingChatList([item, ...s])
            })
        } 
        if(chatType === 'mail') {
            setChatList(s => {
                const sender_user = s.find(i => i.sender_user?.id === item.sender_user_id)?.sender_user
                if(sender_user) {
                    return sortingMailChatList([{...item, sender_user}, ...s])
                } else return sortingMailChatList([item, ...s])
            })
        }
    }, [chatList, chatType])



    // сброс пагинации диалогов при смене фильтра
    useEffect(() => {
        setDialogsList([])
        setDialogsPage(1)
    }, [filter])



    // !! подписка на события по сокету
    useEffect(() => {
        if(socketChannel) {
            if(chatType === 'chat') {
                if(newMessage) {
                    console.log(newMessage)
                    setDialogsList(s => {
                        const m = s;
                        const findItem = m.find((i: any) => i.id === newMessage?.chat_list_item?.chat?.id)
                        if(findItem) {
                            const rm = m.splice(m.findIndex(i => i.id == findItem.id), 1, newMessage?.chat_list_item?.chat)
                            
                            return sortingDialogList([...m])
                        } else {
                            return sortingDialogList([newMessage?.chat_list_item?.chat, ...s])
                        }
                    })
    
                    if(currentChatId === newMessage?.chat_list_item?.chat?.id) {
                        setChatList(s => {
                            return sortingChatList([{...newMessage?.chat_message, sender_user: newMessage?.chat_list_item?.chat?.last_message?.sender_user}, ...s])
                        })
                    }
                }
                socketChannel?.listen('.chat-message-read-event', (data: any) => {
                    console.log(data)
                    if(currentChatId && currentChatId == data?.chat_id) {
                        setChatList(s => {
                            const findItem = s.find(i => i.id == data?.chat_message_id)
                            if(findItem) {
                                const m = s;
                                const rm = s.splice(m.findIndex(i => i.id == findItem.id), 1, {...findItem, is_read_by_recepient: 1})
                                return sortingChatList([...m])
                            } else {
                                return s;
                            }
                        })
                    }
                })
            }
            if(chatType === 'mail') {
                if(newMail) {
                    console.log(newMail)
                    // setDialogsList(s => {
                    //     const m = s;
                    //     const findItem = m.find((i: any) => i.id === newMail?.letter_message?.letter?.id)
                    //     console.log('findItem', findItem)
                    //     if(findItem) {
                    //         const rm = m.splice(m.findIndex(i => i.id == findItem.id), 1, newMail?.letter_message)
                    //         return sortingDialogList([...m])
                    //     } else {
                    //         return sortingDialogList([newMail?.letter_message, ...s])
                    //     }
                    // })
                    setDialogsList(s => {
                        const m = s;
                        const findItem = m.find((i: any) => i.id === newMail?.letter_list_item?.letter?.id)
                        if(findItem) {
                            const rm = m.splice(m.findIndex(i => i.id == findItem.id), 1, newMail?.letter_list_item?.letter)
                            
                            return sortingDialogList([...m])
                        } else {
                            return sortingDialogList([newMail?.letter_list_item?.letter, ...s])
                        }
                    })
                    updateChat(newMail?.letter_message)




                    // updateDialogsList && updateDialogsList((s: any) => {
                    //     const m = s;
                    //     const rm = m.splice(m.findIndex((i: any) => i.id === res?.letter?.id), 1, res?.letter)
                    //     return sortingDialogList([...m])
                    // })
                    // updateChat(res?.letter?.last_message)   
                }
            }
        }
    }, [socketChannel, currentChatId, chatType, newMessage, newMail])

    // useEffect(() => {
    //     if(chatType) {
    //         Router.push(`/chat?type=${chatType}`)
    //     }
        
    // }, [chatType])

    


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
                            chatList={chatList}
                            dialogsList={dialogsList}
                            activeDialogId={currentChatId}
                            totalChatItemCount={totalChatItemCount}
                            totalDialogItemCount={totalDialogItemCount}      

                            updateDialogsPage={setDialogsPage}
                            updateChatListPage={setChatListPage}
                            updateDialogsList={setDialogsList}
                                         


                            // !!тестовый проп
                            updateChat={updateChat}
                            ChatType={chatType}
                            loadMain={loadMain}
                            loadSide={loadSide}

                            loadedDialogs={loadedDialogs}

                            currentUser={currentUser}
                            />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default ChatLayout;