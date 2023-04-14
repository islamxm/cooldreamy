import styles from './ChatList.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import { useRouter } from 'next/router';
import PromoBadge from '../PromoBadge/PromoBadge';
import ApiService from '@/service/apiService';
import {useEffect, useRef, useState} from 'react';
import { chatItemPropsTypes } from '../../types';
import {useCallback} from 'react';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';

const service = new ApiService()


const ChatList = () => {
    const {query} = useRouter()
    const {inView, ref} = useInView()
    const [page, setPage] = useState(1)
    const [list, setList] = useState<any[]>([])
    const [loadMore, setLoadMore] = useState(true)
    const [id, setId] = useState('')


    //получение текущего чатрума
    useEffect(() => {
        if(query?.id && typeof query?.id === 'string') {
            setId(query?.id)
        }
    }, [query])
    

    // получение списка чатов
    const getChatList = (update?: boolean) => {
        service.getChatList(page, 10).then(res => {
            console.log(res?.data)
            if(res?.data?.length < 10) {
                setLoadMore(false)
            } else {
                setLoadMore(true)
            }

            if(update) {
                setList(s => [...s, ...res?.data])
            } else {
                setList(res?.data)
            }
        })
    }


    // следующая страница в конце списка
    useEffect(() => {
        if(inView && page <= 2) {
            setPage(s => s + 1)
        }
    }, [inView])
   


    // догрузка списка
    useEffect(() => {
        if(page > 1) {
            getChatList && getChatList(true)
        } else {
            getChatList && getChatList()
        }
    }, [page])



    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
            {/* <PromoBadge/> */}
            {
                list?.map((item, index) => (
                    <ChatItem
                        key={index}
                        {...item}
                        active={item?.id === Number(id)}
                        />
                ))

            }
            {
                list?.length > 0 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.loader}><PulseLoader color='var(--violet)'/></div>
                    ) : null
                ) : null
            }
            
            
        </div>  
    )
}

export default ChatList;