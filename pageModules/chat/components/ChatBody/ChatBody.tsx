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
    

    useEffect(() => {
        // service.getChatList().then(res => {
        //     console.log(res)
        // })
        // service.readMessage({chat_message_id: 83}).then(res => {
        //     console.log(res)
        // })
        // service.getChat(14, 30).then(res => console.log(res))
        
    }, [])


    const test = () => {
        
    }

    


    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <ChatSide/> 
                
                
            </div>         
            <div className={styles.main}>
                {/* <Dialog/> */}
                <Button 
                    onClick={test}
                    text='Test'/>
               
            </div>   
            <div className={styles.action}>
                <ChatAction/>
            </div>
        </div>
    )
}

export default ChatBody;