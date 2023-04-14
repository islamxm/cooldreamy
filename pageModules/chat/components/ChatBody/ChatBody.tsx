import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';
import { useEffect } from 'react';
import Button from '@/components/Button/Button';
import { tks } from '@/service/apiService';
import testimg from '@/public/assets/images/test.jpg';
import Image from 'next/image';
const service = new ApiService()



const ChatBody = () => {

    

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <ChatSide/> 
            </div>         
            <div className={styles.main}>
                <div className={styles.body}>
                    <Dialog/>
                </div>
                <div className={styles.action}>
                    <ChatAction/>
                </div>
            </div>   
           
        </div>
    )
}

export default ChatBody;