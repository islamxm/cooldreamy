import styles from './MailItem.module.scss';
import {FC} from 'react';
import Avatar from '@/components/Avatar/Avatar';
import UserTitle from '@/components/UserTitle/UserTitle';
import { chatMailTypes, mailItemType } from '@/pageModules/chat/types';
import moment from 'moment';
import {useState, useEffect} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import chatMessageTypeVariants from '@/helpers/messageVariants';
import { IMail } from '@/pageModules/chat/types';
import FancyboxWrapper from '@/components/FancyboxWrapper/FancyboxWrapper';
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
}) => {
    const {token} = useAppSelector(s => s)
    const [openLoad, setOpenLoad] = useState(false)


    useEffect(() => {
        console.log(images)
    }, [images])
    
    const switchMessageType = (type?: chatMailTypes) => {
        switch(type) {
            case chatMessageTypeVariants?.letterText:
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
                            isSelf ? (
                                images?.length > 0 ? (
                                    <FancyboxWrapper>
                                        <div className={styles.media}>
                                            {images?.map((item, index) => (
                                                <a data-fancybox="gallery" href={item.image} className={styles.item} key={index}>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt=''
                                                        src={item?.thumbnail ? item.thumbnail : ''}
                                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                        />
                                                </a>
                                            ))}
                                        </div>
                                    </FancyboxWrapper>
                                    
                                ) : null
                            ) : (
                                isPayed ? (
                                    images?.length > 0 ? (
                                        <FancyboxWrapper>
                                            <div className={styles.media}>
                                                {images?.map((item, index) => (
                                                    item?.image ? (
                                                        <a data-fancybox="gallery" href={item.image} className={styles.item} key={index}>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt=''
                                                                src={item?.thumbnail ? item.thumbnail : ''}
                                                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                                />
                                                        </a>
                                                    ) : (
                                                        <div className={styles.item} key={index}>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt=''
                                                                src={item?.blur ? item.blur : ''}
                                                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                                />
                                                        </div>
                                                    )
                                                    
                                                ))}
                                            </div>
                                        </FancyboxWrapper>
                                        
                                    ) : null
                                ) : (
                                    images?.length > 0 ? (
                                        <div className={styles.media}>
                                            {images?.map((item, index) => (
                                                <div className={styles.item} key={index}>
                                                    <Image
                                                        width={100}
                                                        height={100}
                                                        alt=''
                                                        src={item?.blur ? item.blur : ''}
                                                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                                        />
                                                </div>
                                            ))}
                                        </div>
                                    ) : null
                                )
                            )
                        }
                        
                        
                    </div>
                )
            // case chatMessageTypeVariants?.letterGift:
            //     return (

            //     )
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
                    isPayed || isSelf ? (
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