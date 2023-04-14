import styles from './DialogItem.module.scss';
import {FC, useState, useEffect, useCallback} from 'react';
import { dialogItemType } from '@/pageModules/chat/types';
import Avatar from '@/components/Avatar/Avatar';
import img from '@/public/assets/images/avatar-placeholder.png';
import {BsCheckAll} from 'react-icons/bs';
import Moment from 'react-moment';
import Image from 'next/image';


const DialogItem:FC<dialogItemType> = ({
    me,
    is_read_by_recepient,
    chat_messageable,
    chat_messageable_type,
    updated_at,

}) => {


    const switchMessageType = useCallback((chat_messageable_type?: string) => {
        switch(chat_messageable_type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            <div className={styles.item}>
                                <Image
                                    src={chat_messageable?.thumbnail_url ? chat_messageable?.thumbnail_url : ''}
                                    loader={(p) => {
                                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                    }}
                                    alt=''
                                    width={100}
                                    height={100}
                                    />
                            </div>
                        </div>
                        <div className={styles.time}><Moment format='HH:MM'>{updated_at}</Moment></div>
                    </div>
                ) 
            case "App\\Models\\ChatTextMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <p>
                                {chat_messageable?.text}
                            </p>
                            
                        </div>
                        <div className={styles.time}><Moment format='HH:MM'>{updated_at}</Moment></div>
                    </div>      
                )
            case "App\\Models\\ChatWinkMessage":
                return (
                    <h1 style={{color: 'red'}}>Wink</h1>
                )
            default:
                return null

        }
    }, [chat_messageable_type, chat_messageable, updated_at])



    return (
        <div className={`${styles.wrapper} ${me ? styles.right : styles.left}`}>
            {
                me ? (
                    <div className={`${styles.body} ${styles.me}`}>
                        <div className={styles.message}>
                            {switchMessageType(chat_messageable_type)}
                            {
                                is_read_by_recepient === 1 ? (
                                    <div className={styles.ex}>
                                        Просмотрено
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className={styles.avatar}>
                            <Avatar
                                round
                                image={img}
                                size={40}
                                />
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.body} ${styles.you}`}>
                        <div className={styles.avatar}>
                            <Avatar
                                round
                                image={img}
                                size={40}
                                />
                        </div>
                        <div className={styles.message}>
                            {switchMessageType(chat_messageable_type)}
                        </div>
                    </div>
                )   
            }
        </div>
    )
}


export default DialogItem;