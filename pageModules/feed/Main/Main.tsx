import styles from './Main.module.scss';
import IFeedCard from '@/models/IFeedCard';
import IconButton from '@/components/IconButton/IconButton';
import {CgClose} from 'react-icons/cg';
import {HiHeart} from 'react-icons/hi';
import {useEffect, useState, useCallback} from 'react';
import Card from './components/Card/Card';
import ApiService from '@/service/apiService';
import img from '@/public/assets/images/girl-big.png';
import { AnimatePresence } from 'framer-motion';

const service = new ApiService()
export type SwipeType = "like" | "nope" | "superlike";

export type ResultType = { [k in SwipeType]: number };

const mock: IFeedCard[] = [
    {
        name: 'Name 1',
        age: 23,
        avatar_url_thumbnail: img,
        id: 1
    },
    {
        name: 'Name 2',
        age: 20,
        avatar_url_thumbnail: img,
        id: 2
    },
    {
        name: 'Name 3',
        age: 20,
        avatar_url_thumbnail: img,
        id: 3
    },
    {
        name: 'Name 4',
        age: 20,
        avatar_url_thumbnail: img,
        id: 4
    },
    {
        name: 'Name 5',
        age: 20,
        avatar_url_thumbnail: img,
        id: 5
    },
    {
        name: 'Name 6',
        age: 20,
        avatar_url_thumbnail: img,
        id: 6
    }
]



const Main = () => {
    // ** Список карточек
    const [list, setList] = useState<IFeedCard[]>(mock)
    

    // // ** текущая страница (передается в апи)
    // const [page, setPage] = useState(1);

    // // ** ID текущей карточки
    // const [currentCard, setCurrentCard] = useState<number>(0)
    
    // // ** Первое получение списка
    // const getInitFeed = () => {
    //     service.getFeed(page).then(res => {
    //         setList(res?.data)
    //     })
    // }

    // // ** дополнение списка по мере необходимости
    // const updateFeed = useCallback(() => {
    //     page && service.getFeed(page).then(res => {
    //         if(res?.data?.length > 0) {
    //             setList(s => [...s, ...res?.data])
    //         } else {
    //             // карточки закончились
    //         }
    //     })
    // }, [page])

    // // ** первая загрузка карточек
    // useEffect(() => {
    //     getInitFeed()
    // }, [])

    // // ** изменение страницы когда в списке остается меньше или равно 3 карточек (догрузка)
    // useEffect(() => {
    //     if(list?.length <= 3) {
    //         setPage(s => s + 1)
    //     }
    // }, [list])

    // // ** догрузка карточек
    // useEffect(() => {
    //     if(page > 1) {
    //         updateFeed()
    //     }
    // }, [page])


    // // ** лайк
    // const onLike = () => {
    //     if(currentCard) {
    //         service.feedItemLike(currentCard).then(res => {
    //             console.log(res)
    //             if(res?.message == 'success') {
    //                 setList(s => s.filter((i, index) => index !== 0))
    //             }
    //         })
    //     } 
    // }

    // // ** отмена
    // const onCancel = () => {
    //     if(currentCard) {
    //         service.feedItemSkip(currentCard).then(res => {
    //             console.log(res)
    //             if(res?.message == 'success') {
    //                 setList(s => s.filter((i, index) => index !== 0))
    //             }
    //         })
    //     }
    // } 


    // // ** определение текущей карточки (ее ID)
    // useEffect(() => {
    //     if(list && list.length > 0) {
    //         setCurrentCard(list[0].id)
    //         console.log(list)
    //     }
    // }, [list])



    // !! test
    const [result, setResult] = useState<ResultType>({
        like: 0,
        nope: 0,
        superlike: 0,
    });
    // const [history, setHistory] = useState<any[]>([])
    const activeIndex = 0;
    const [liking, setLiking] = useState(false)
    const [canceling, setCanceling] = useState(false)

    const removeCard = (card: any, type: SwipeType) => {
        // setHistory(s => [...s, {}])
        setList(s => {
            return s.filter(i => i.id !== card.id)
        })
        setResult((current) => ({ ...current, [type]: current[type]}));
    }


    return (
        <div className={styles.wrapper}>
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
                                        zindex: index + 1,
                                        setCanceling,
                                        setLiking
                                    }}
                                    />
                            ))
                        }
                </AnimatePresence>
                
            </div>
            <div className={styles.action}>
                <div className={`${styles.item} ${canceling ? styles.active : ''}`}>
                    <IconButton
                        onClick={() => removeCard(list[0], 'nope')}
                        variant={'danger'}
                        icon={<CgClose size={40} color='#fff'/>}
                        />
                </div>
                {/* <div className={styles.item}></div> */}
                <div className={`${styles.item} ${liking ? styles.active : ''}`}>
                    <IconButton
                        onClick={() => removeCard(list[0], 'like')}
                        icon={<HiHeart size={35}/>}
                        />
                </div>
            </div>
        </div>
    )
}


export default Main;