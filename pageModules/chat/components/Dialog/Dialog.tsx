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
import SkeletonChat from '../SkeletonChat/SkeletonChat';

// import {FixedSizeList} from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
// import InfiniteLoader from 'react-window-infinite-loader'

interface I extends IChat {
    height?: string
}

const Item = ({data, index, style}: {data: any, index: number, style: any}) => (
    <div style={style}>
        {
            data ? (
                <DialogItem {...data}/>
            ) : <div>Loading...</div>
        }
        
    </div>
)



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
                            key={index}
                            id={item.id}
                            avatar={item?.sender_user?.avatar_url_thumbnail}
                            status={item?.is_read_by_recepient === 1 ? 'read' : 'unread'}
                            text={item.chat_messageable?.text}
                            images={[{image: item.chat_messageable?.image_url, thumbnail: item?.chat_messageable?.thumbnail_url}]}
                            gifts={item.chat_messageable?.gifts}
                            sticker={item.chat_messageable?.sticker}
                            type={item?.chat_messageable_type}
                            isSelf={item.sender_user_id === Number(userId)} 
                            createdAt={item.created_at}
                            updatedAt={item.updated_at}
                            index={index}
                            showAvatar={item.sender_user_id !== chatList[index - 1]?.sender_user_id}
                            senderUser={item?.sender_user}
                            />
                    ))
                }
            </AnimatePresence>
            
            
            
            {
                chatList && chatList?.length > 0 ? (
                    loadMore ? (
                        <div ref={ref} className={styles.load}>
                            {/* <PulseLoader color='var(--violet)'/> */}
                            <SkeletonChat/>
                        </div>
                    ) : null
                ) : null
            }
        </div>
    )
}

export default Dialog;