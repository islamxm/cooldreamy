import styles from './ChatList.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import { useRouter } from 'next/router';
import PromoBadge from '../PromoBadge/PromoBadge';
import ApiService from '@/service/apiService';
import {useEffect, useState} from 'react';
import { chatItemPropsTypes } from '../../types';
const service = new ApiService()

// const list = new Array(20).fill(1);


const ChatList = () => {
    const {pathname, query} = useRouter()
    const [page, setPage] = useState(1)
    const [list, setList] = useState<any[]>([])

    const getInitList = () => {
        service.getChatList(1, 10).then(res => {
            console.log(res)
            setList(res?.data)
        })
    }

    useEffect(() => {
        getInitList()
    }, [])
    


    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
            {/* <PromoBadge/> */}
            {
                list?.map((item, index) => (
                    <ChatItem
                        key={index}
                        {...item}
                        active={false}
                        />
                ))
            }
        </div>  
    )
}

export default ChatList;