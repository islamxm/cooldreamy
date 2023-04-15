import styles from './Main.module.scss';
import IFeedCard from '@/models/IFeedCard';
import IconButton from '@/components/IconButton/IconButton';
import {CgClose} from 'react-icons/cg';
import {AiOutlineMessage} from 'react-icons/ai';
import {HiHeart} from 'react-icons/hi';
import {useEffect, useState, useCallback} from 'react';
import Card from './components/Card/Card';
import ApiService from '@/service/apiService';
import img from '@/public/assets/images/girl-big.png';
import { AnimatePresence } from 'framer-motion';
import CreateChatModal from '@/components/CreateChatModal/CreateChatModal';
import Router from 'next/router';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()

export type SwipeType = "like" | "nope" | "superlike";
export type ResultType = { [k in SwipeType]: number };



// const mock: IFeedCard[] = [
//     {
//         name: 'Name 1',
//         age: 23,
//         avatar_url_thumbnail: img,
//         id: 1
//     },
//     {
//         name: 'Name 2',
//         age: 20,
//         avatar_url_thumbnail: img,
//         id: 2
//     },
//     {
//         name: 'Name 3',
//         age: 20,
//         avatar_url_thumbnail: img,
//         id: 3
//     },
//     {
//         name: 'Name 4',
//         age: 20,
//         avatar_url_thumbnail: img,
//         id: 4
//     },
//     {
//         name: 'Name 5',
//         age: 20,
//         avatar_url_thumbnail: img,
//         id: 5
//     },
//     {
//         name: 'Name 6',
//         age: 20,
//         avatar_url_thumbnail: img,
//         id: 6
//     }
// ]



const Main = () => {
    const {token} = useAppSelector(s => s);



    // ** Список карточек
    const [list, setList] = useState<IFeedCard[]>([])
    

    // ** текущая страница (передается в апи)
    const [page, setPage] = useState(1);

    // ** ID текущей карточки
    const [currentCard, setCurrentCard] = useState<number>(0)


    // !! test
    const activeIndex = 0;
    const [liking, setLiking] = useState(false)
    const [canceling, setCanceling] = useState(false)


    
    // ** Первое получение списка
    const getInitFeed = () => {
        if(token) {
            service.getFeed({
                page
            }, token).then(res => {
                setList(res?.data)
                console.log(res?.data)
            })
        }
    }

    // ** дополнение списка по мере необходимости
    const updateFeed = useCallback(() => {
        if(token) {
            page && service.getFeed({page}, token).then(res => {
                console.log(res?.data)
                if(res?.data?.length > 0) {
                    setList(s => [...s, ...res?.data])
                } else {
                    // карточки закончились
                }
            })
        }
        
    }, [page, token])

    // ** первая загрузка карточек
    useEffect(() => {
        getInitFeed()
    }, [token])

    // ** изменение страницы когда в списке остается меньше или равно 3 карточек (догрузка)
    useEffect(() => {
        if(list?.length <= 3) {
            setPage(s => s + 1)
        }
    }, [list])

    // ** догрузка карточек
    useEffect(() => {
        if(page > 1) {
            updateFeed()
        }
    }, [page])


    // ** лайк
    const onLike = () => {
        if(token) {
            if(currentCard) {
                service.feedItemLike({id: currentCard}, token).then(res => {
                    console.log(res)
                })
            } 
        }
        
    }

    // ** отмена
    const onCancel = () => {
        if(token) {
            if(currentCard) {
                service.feedItemSkip({id: currentCard}, token).then(res => {
                    console.log(res)
                })
            }
        }
    } 


    // ** определение текущей карточки (ее ID)
    useEffect(() => {
        if(list && list.length > 0) {
            setCurrentCard(list[0].id)
        }
    }, [list])




    

    const removeCard = (card: any, type: SwipeType) => {
        setList(s => {
            return s.filter(i => i.id !== card.id)
        })

        if(type === 'like') {
            onLike()
        }
        if(type === 'nope') {
            onCancel()
        }
    }


    const createChat = () => {
        if(token) {
            if(currentCard) {
                service.createChat({
                    user_id: currentCard
                }, token).then(res => {
                    // console.log(res)
                    if(res?.chat_id) {
                        Router.push(`/chat/${res?.chat_id}`)
                    }
                })
            }
        }
       
    }


    return (
        <div className={styles.wrapper}>
            {/* <CreateChatModal
                open={createChatModal}
                id={list[0]?.id}
                onCancel={closeCreateChatModal}
                /> */}
            <div className={styles.slider}>
                <AnimatePresence>
                        {
                            list?.map((item, index) => (
                                <Card 
                                    removeCard={removeCard}
                                    active={activeIndex === index}
                                    key={item.name}
                                    card={{
                                        ...item,
                                        // onLike: onLike,
                                        // onCancel: onCancel,
                                        index: index,
                                        setCanceling,
                                        setLiking,
                                        canceling,
                                        liking
                                    }}
                                    />
                            ))
                        }
                </AnimatePresence>
            </div>
            <div className={styles.action}>
                <div className={`${styles.item} ${canceling ? styles.active : ''}`}>
                    <IconButton
                        disabled={list?.length === 0}
                        onClick={() => removeCard(list[0], 'nope')}
                        variant={'danger'}
                        icon={<CgClose size={40} color='#fff'/>}
                        />
                </div>
                <div className={styles.item}>
                    <IconButton
                        disabled={list?.length === 0}
                        onClick={createChat}
                        size={50}
                        variant={'bordered'}
                        icon={<AiOutlineMessage size={25}/>}
                        />
                </div>
                <div className={`${styles.item} ${liking ? styles.active : ''}`}>
                    <IconButton
                        disabled={list?.length === 0}
                        onClick={() => removeCard(list[0], 'like')}
                        icon={<HiHeart size={35}/>}
                        />
                </div>
            </div>
        </div>
    )
}


export default Main;