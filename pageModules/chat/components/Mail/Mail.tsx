import styles from './Mail.module.scss';
import MailItem from './components/MailItem/MailItem';
import {IChat} from '../../types';
import {FC, useEffect} from 'react';

interface I extends IChat {
    height?: string
}

const Mail:FC<I> = ({
    height,
    chatList
}) => {

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
            
        </div>
    )
}


export default Mail;