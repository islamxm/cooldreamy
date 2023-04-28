import styles from './Dialog.module.scss';
import ApiService from '@/service/apiService';
import { useRouter } from 'next/router';
import {useState, useEffect, useRef, FC} from 'react';
import DialogItem from './components/DialogItem/DialogItem';
import { dialogItemType, IChat } from '../../types';
import { PulseLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { AnimatePresence } from 'framer-motion';
import {useChatScroll, useDataLoader} from 'use-chat-scroll'




interface I extends IChat {
    height?: string
}


const Dialog:FC<I> = ({
    chatList,
    updateChatListPage,
    id,
    height,
    totalChatItemCount
}) => {
    const {userId} = useAppSelector(s => s)
    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState(false)



    
    useEffect(() => {
        if(totalChatItemCount !== undefined) {
            chatList?.length >= totalChatItemCount ? setLoadMore(false) : setLoadMore(true)
        }

        console.log('chat list', chatList)
       
    }, [chatList, totalChatItemCount])


    useEffect(() => {
        if(loadMore && inView) {
            updateChatListPage && updateChatListPage((s: number) => s + 1)
        }
    }, [inView, loadMore, updateChatListPage])


   
   
   
    

    return (
        <div className={styles.wrapper} style={{maxHeight: height}}>
            <AnimatePresence>
                {
                    chatList?.map((item, index) => (
                        <DialogItem
                            {...item}
                            me={item.sender_user_id === Number(userId)} 
                            key={index}/>
                    ))
                }
            </AnimatePresence>
            
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

export default Dialog;