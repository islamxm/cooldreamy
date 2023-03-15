import styles from './ChatBody.module.scss';
import ChatSide from '../ChatSide/ChatSide';
import Dialog from '../Dialog/Dialog';
import ChatAction from '../ChatAction/ChatAction';

const ChatBody = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <ChatSide/> 
            </div>         
            <div className={styles.main}>
                <Dialog/>
            </div>   
            <div className={styles.action}>
                <ChatAction/>
            </div>
        </div>
    )
}

export default ChatBody;