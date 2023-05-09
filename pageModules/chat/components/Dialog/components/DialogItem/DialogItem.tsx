import styles from './DialogItem.module.scss';
import {FC, useState, useEffect, useCallback, memo} from 'react';
import { chatMessageTypes, dialogItemType } from '@/pageModules/chat/types';
import Avatar from '@/components/Avatar/Avatar';
import img from '@/public/assets/images/avatar-placeholder.png';
import {BsCheckAll} from 'react-icons/bs';
import Moment from 'react-moment';
import Image from 'next/image';
import {motion} from 'framer-motion';
import moment from 'moment';
import {FaSmileWink} from 'react-icons/fa';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
import { IMessage } from '@/pageModules/chat/types';
import { useInView } from 'react-intersection-observer';
import { useAppSelector } from '@/hooks/useTypesRedux';
import ApiService from '@/service/apiService';


const service = new ApiService()


interface I extends IMessage {
    showAvatar?: boolean
}



const DialogItemComponent:FC<I> = ({
    id,
    avatar,
    createdAt,
    updatedAt,
    status,
    isSelf,
    type,
    text,
    images,
    sticker,
    gifts,
    index,
    showAvatar,
}) => {
    const {token} = useAppSelector(s => s)
    const {inView, ref} = useInView({
        triggerOnce: true,
    })



    useEffect(() => {
        if(status === 'unread' && id && inView && !isSelf) {
            if(token) {
                service.readMessage({chat_message_id: Number(id)}, token)
            }
        }
    }, [status, token, id, inView, isSelf])





    const switchMessageType = (type?: chatMessageTypes) => {
        switch(type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    <div className={styles.media}>
                        <FancyboxWrapper>
                            <div className={styles.body}>
                                <a data-fancybox="gallery" href={images[0].image} className={styles.item}>
                                    <Image
                                        src={images[0].thumbnail ? images[0].thumbnail : ''}
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
                        
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                    </div>
                ) 
            case "App\\Models\\ChatTextMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <p>
                                {/* {text} */}
                                {id} <br/>
                                {status}
                            </p>
                            
                        </div>
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
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
                                gifts?.map((item,index) => (
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
            case "App\\Models\\ChatStickerMessage":
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            <div className={styles.item}>
                                    <Image
                                    src={sticker?.picture_url ? sticker?.picture_url : ''}
                                    loader={(p) => {
                                        return p?.src && typeof p?.src === 'string' ? p?.src : ''
                                    }}
                                    alt=''
                                    width={100}
                                    height={100}
                                    />
                            </div>
                        </div>
                    </div>
                )
            default:
                return null

        }
    }


    return (
        <div ref={ref} className={`${styles.wrapper} ${isSelf ? styles.right : styles.left}`}>
            {
                isSelf ? (
                    <div className={`${styles.body} ${styles.me}`}>
                        <div 
                            className={styles.message}>
                            {switchMessageType(type)}
                            {
                                status === 'read' ? (
                                    <div className={styles.ex}>
                                        <div className={styles.label}>Просмотрено</div>
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                ) : null
                            }
                        </div>
                        
                        {/* <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                round
                                image={avatar}
                                size={40}
                                />
                        </div> */}
                    </div>
                ) : (
                    <div className={`${styles.body} ${styles.you}`}>
                        <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                round
                                image={avatar}
                                size={40}
                                />
                        </div>
                        <div
                            className={styles.message}>
                            {switchMessageType(type)}
                        </div >
                    </div>
                )   
            }
        </div>
    )
}

const DialogItem = memo(DialogItemComponent)
export default DialogItem;