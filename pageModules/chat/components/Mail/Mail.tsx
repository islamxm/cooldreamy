import styles from './Mail.module.scss';
import MailItem from './components/MailItem/MailItem';
import {IChat} from '../../types';
import {FC, useEffect, useState} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';


interface I extends IChat {
    height?: string
}

const Mail:FC<I> = ({
    height,
    chatList,
    updateChatListPage,
    totalChatItemCount
}) => {
    const {userId} = useAppSelector(s => s)
    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState(false)
    
        
    useEffect(() => {
        if(totalChatItemCount !== undefined) {
            chatList?.length >= totalChatItemCount ? setLoadMore(false) : setLoadMore(true)
        }
       
    }, [chatList, totalChatItemCount])


    useEffect(() => {
        if(loadMore && inView) {
            updateChatListPage && updateChatListPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateChatListPage])


    useEffect(() => {
        console.log(chatList)
    }, [chatList])

    

    return (
        <div className={styles.wrapper} style={{maxHeight: height}}>
            {
                chatList?.map((item, index) => (
                    // <DialogItem
                    //     {...item}
                    //     me={item.sender_user_id === Number(userId)} 
                    //     key={index}/>
                    <MailItem
                        {...item}
                        key={index}
                        />
                ))
            }
            {
                chatList && chatList?.length > 0 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.load}>
                            <PulseLoader color='var(--violet)'/>
                        </div>
                    ) : null
                ) : null
            }
        </div>
    )
}


export default Mail;