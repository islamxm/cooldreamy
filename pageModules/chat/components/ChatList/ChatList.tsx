import styles from './ChatList.module.scss';
import ChatItem from '../ChatItem/ChatItem';
import { useRouter } from 'next/router';
import {useEffect} from 'react';

const list = new Array(20).fill(1);


const ChatList = () => {
    const {pathname, query} = useRouter()


    


    return (
        <div className={`${styles.wrapper} custom-scroll-vertical`}>
            
            {
                list?.map((item, index) => (
                    <ChatItem
                        id={(index + 1).toString()}
                        isActive={pathname.includes('/chat') && (index + 1).toString() === query?.id}
                        isFavourite={index === 1}
                        key={index}
                        unreadMesssageCount={index === 3 ? 3 : 0}
                        status={index === 3 ? 'unread' : undefined}
                        />
                ))
            }
        </div>  
    )
}

export default ChatList;