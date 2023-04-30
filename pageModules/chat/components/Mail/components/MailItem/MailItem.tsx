import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { mailItemType } from '@/pageModules/chat/types';
import moment from 'moment';
import {useState, useEffect} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';

const service = new ApiService()


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
    const {token} = useAppSelector(s => s)
    const [openLoad, setOpenLoad] = useState(false)

    useEffect(() => {
        console.log(letter_messageable)
    }, [letter_messageable])
    
    const switchMessageType = (letter_messageable_type?: string) => {
        switch(letter_messageable_type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    null
                ) 
            case "App\\Models\\LetterTextMessage":
                return (
                    <div className={styles.content_text}>
                        <div className={styles.text_body}>
                        {letter_messageable?.text}
                        </div>
                        {/* {
                            letter_messageable?.
                        } */}
                        <div className={styles.media}>
                            
                        </div>
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
    }


    const openMail = () => {
        if(token && id) {
            setOpenLoad(true)
            service.mailOpenPay({letter_text_message_id: id}, token).then(res => {
                console.log(res)
            }).finally(() => {
                setOpenLoad(false)
            })
        }        
    }


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
                {
                    letter_messageable?.is_payed === 1 ? (
                        null
                    ) : (
                        <div className={styles.action}>
                            <div className={styles.item}>
                                <button onClick={openMail} className={styles.open}>Открыть письмо</button>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}


export default MailItem;