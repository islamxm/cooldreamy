import styles from './DialogItem.module.scss';
import {FC, useState, useEffect, useCallback} from 'react';
import { dialogItemType } from '@/pageModules/chat/types';
import Avatar from '@/components/Avatar/Avatar';
import img from '@/public/assets/images/avatar-placeholder.png';
import {BsCheckAll} from 'react-icons/bs';
import Moment from 'react-moment';
import Image from 'next/image';
import {motion} from 'framer-motion';
import moment from 'moment';
import {FaSmileWink} from 'react-icons/fa';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';


interface I extends dialogItemType {
    showAvatar?: boolean
}



const DialogItem:FC<I> = ({
    me,
    is_read_by_recepient,
    chat_messageable,
    chat_messageable_type,
    updated_at,
    created_at,
    index,
    showAvatar
}) => {


    const switchMessageType = useCallback((chat_messageable_type?: string) => {
        switch(chat_messageable_type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    <div className={styles.media}>
                        <FancyboxWrapper>
                            <div className={styles.body}>
                                <a data-fancybox="gallery" href={chat_messageable?.image_url} className={styles.item}>
                                    <Image
                                        src={chat_messageable?.thumbnail_url ? chat_messageable?.thumbnail_url : ''}
                                        loader={(p) => {
                                            return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                        }}
                                        alt=''
                                        width={100}
                                        height={100}
                                        />
                                </a>
                            </div>
                        </FancyboxWrapper>
                        
                        <div className={styles.time}>{moment(updated_at).format('hh:mm')}</div>
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
                        <div className={styles.time}>{moment(updated_at).format('hh:mm')}</div>
                    </div>      
                )
            case "App\\Models\\ChatWinkMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <motion.div
                                initial={{opacity: 0, scale: 0}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{type: 'spring', damping: 17, stiffness: 400}}
                                >
                                <FaSmileWink size={50} color='var(--violet)'/>
                            </motion.div>
                        </div>
                    </div>
                )
            case "App\\Models\\ChatGiftMessage":
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            {
                                chat_messageable?.gifts?.map((item,index) => (
                                    <div className={styles.item} key={index}>
                                         <Image
                                            src={item?.picture_url ? item?.picture_url : ''}
                                            loader={(p) => {
                                                return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                            }}
                                            alt=''
                                            width={100}
                                            height={100}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                   
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
                        <motion.div className={styles.message}>
                            {switchMessageType(chat_messageable_type)}
                            {
                                is_read_by_recepient === 1 ? (
                                    <div className={styles.ex}>
                                        Просмотрено
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                ) : null
                            }
                        </motion.div>
                        
                        <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
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
                        <div
                            className={styles.message}>
                            {switchMessageType(chat_messageable_type)}
                        </div>
                    </div>
                )   
            }
        </div>
    )
}


export default DialogItem;