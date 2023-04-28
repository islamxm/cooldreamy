import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { mailItemType } from '@/pageModules/chat/types';
import moment from 'moment';
import {useEffect, useCallback} from 'react';


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
    updated_at,
    sender_user
}) => {


    // useEffect(() => {
    //     console.log(letter_messageable_type)
    //     console.log(letter_messageable)
    // }, [letter_messageable, letter_messageable_type])

    const switchMessageType = useCallback((letter_messageable_type?: string) => {
        switch(letter_messageable_type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    null
                ) 
            case "App\\Models\\LetterTextMessage":
                return (
                    <div className={styles.content_text}>
                        {letter_messageable?.text}
                    </div>
                )
            case "App\\Models\\ChatWinkMessage":
                return (
                    null
                )
            case "App\\Models\\ChatGiftMessage":
                return (
                    null
                )
            default:
                return null

        }
    }, [letter_messageable_type, letter_messageable, updated_at])

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar 
                    image={sender_user?.avatar_url_thumbnail}
                    round
                    size={40}/>
            </div>
            <div className={styles.body}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <UserTitle
                            username={sender_user?.name}
                            age={sender_user?.age?.toString()}
                            />
                    </div>
                    <div className={styles.tm}>
                        <div className={styles.status}></div>
                        <div className={styles.label}>{moment(updated_at).format('D MMMM YYYY, h:mm')}</div>
                    </div>
                </div>
                <div className={styles.content}>
                    {switchMessageType(letter_messageable_type)}
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