import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { mailItemType } from '@/pageModules/chat/types';


const MailItem:FC<mailItemType> = ({
    letter_id,
    letter_messageable,
    letter_messageable_id,
    letter_messageable_type,
    created_at,
    disabled,
    id,
    is_read_by_recepient,
    sender_user_id,
    updated_at
}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar 
                    round
                    size={40}/>
            </div>
            <div className={styles.body}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <UserTitle
                            username='User'
                            age='22'
                            />
                    </div>
                    <div className={styles.tm}>
                        <div className={styles.status}></div>
                        <div className={styles.label}>14 января 2023, 01:29</div>
                    </div>
                </div>
                <div className={styles.content}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam numquam impedit cumque necessitatibus accusantium? Repudiandae, laborum ducimus libero, quae adipisci itaque deleniti dolor officiis at, tempora ut recusandae maiores quia.
                </div>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <button className={styles.open}>Открыть письмо</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MailItem;