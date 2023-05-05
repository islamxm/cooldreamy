import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { chatMailTypes, mailItemType } from '@/pageModules/chat/types';
import moment from 'moment';
import {useState, useEffect} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';

import { IMail } from '@/pageModules/chat/types';
import Image from 'next/image';

const service = new ApiService()


const MailItem:FC<IMail> = ({
    id,
    index,
    type,
    avatar,
    name,
    isPayed,
    images,
    gifts,
    age,
    createdAt,
    updatedAt,
    sticker,
    text,
    isSelf
    // letter_id,
    // letter_messageable,
    // letter_messageable_id,
    // letter_messageable_type,
    // created_at,
    // disabled,
    // id,
    // is_read_by_recepient,
    // sender_user_id,
    // updated_at,
    // sender_user
}) => {
    const {token} = useAppSelector(s => s)
    const [openLoad, setOpenLoad] = useState(false)

    
    const switchMessageType = (type?: chatMailTypes) => {
        switch(type) {
            case "App\\Models\\LetterTextMessage":
                return  (
                    <div className={styles.content_text}>
                        {
                            text ? (
                                <div className={styles.text_body}>
                                    {text}
                                </div>
                            ) : null
                        }
                        
                        {
                            images?.length > 0 ? (
                                <div className={styles.media}>
                                    {images?.map((item, index) => (
                                        <div className={styles.item} key={index}>
                                            <Image
                                                width={100}
                                                height={100}
                                                alt=''
                                                src={isPayed && item?.thumbnail ? item.thumbnail : (item.blur ? item?.blur : '')}
                                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                />
                                        </div>
                                    ))}
                                </div>
                            ) : null
                        }
                        
                    </div>
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
                    image={avatar}
                    round
                    size={40}/>
            </div>
            <div className={styles.body}>
                <div className={styles.head}>
                    <div className={styles.user}>
                        <UserTitle
                            username={name}
                            age={age?.toString()}
                            />
                    </div>
                    <div className={styles.tm}>
                        <div className={styles.status}></div>
                        <div className={styles.label}>{moment(updatedAt).format('D MMMM YYYY, h:mm')}</div>
                    </div>
                </div>
                <div className={styles.content}>
                    {switchMessageType(type)}
                </div>
                {
                    isPayed ? (
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