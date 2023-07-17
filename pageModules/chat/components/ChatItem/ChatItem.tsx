import styles from './ChatItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import avatarImg from '@/public/assets/images/girl.png';
import { chatItemPropsTypes } from '../../types';
import UserTitle from '@/components/UserTitle/UserTitle';
import {Row, Col} from 'antd';
import LinesEllipsis from 'react-lines-ellipsis'

import Badge from '@/components/Badge/Badge';
import {BiCheckDouble} from 'react-icons/bi';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';
import Avatar from '@/components/Avatar/Avatar';
import Router, { useRouter } from 'next/router';
import {useEffect} from 'react';
import ApiService from '@/service/apiService';
import { useAppSelector, useAppDispatch } from '@/hooks/useTypesRedux';
import IconButton from '@/components/IconButton/IconButton';
import notify from '@/helpers/notify';
import { updateCurrentProfileId, updateCurrentProfileUiid } from '@/store/actions';
import chatMessageTypeVariants from '@/helpers/messageVariants';


const service = new ApiService()


interface I extends chatItemPropsTypes {
    updateDialogsList: (...args: any[]) => any,
    filter?: 'all' | 'unread' | 'ignored' | 'favorite',
    uuid?: any
}

const ChatItem = ({
    favorite,
    first_user_id,
    id,
    is_ignored_by_first_user,
    is_ignored_by_second_user,
    last_message,
    another_user,
    is_confirmed_user,
    text,
    active,
    
    updateDialogsList,
    filter,
    uuid

}:I) => {
    const dispatch = useAppDispatch()
    const {query} = useRouter()
    const {type} = query || null
    const {token} = useAppSelector(s => s)
    const {avatar_url, avatar_url_thumbnail, name, online, user_avatar_url} = another_user || {};
    

    useEffect(() => {
        console.log(uuid)
    }, [uuid])



    const switchChatType = (type?: string) => {
        switch(type) {
            case chatMessageTypeVariants.messageImage:
                return (
                    'Картинка'
                )
            case chatMessageTypeVariants.messageText:
                
                return  (
                    typeof last_message?.chat_messageable?.text === 'string' ? (
                                            <LinesEllipsis
                        text={last_message?.chat_messageable?.text}
                        maxLine={2}
                        />
                    ) : null

                )
            case chatMessageTypeVariants.messageWink:
                return (
                    'Подмигивание'
                )
            case chatMessageTypeVariants.messageGift:
                return (
                    'Подарок'
                )
            default:
                return null
        }
    }


    const addToFav = () => {
        if(token && id && another_user?.id) {
            service.addUserToFav({user_id: another_user.id}, token).then(res => {
                if(res?.status === 200) {
                    updateDialogsList((s: any | any[]) => {
                        const findItem = s.find((i: any) => i.id === id)
                        if(findItem) {
                            const m = s;
                            const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1, {...findItem, favorite: true})
                            return [...m]
                        } else return s;
                    })
                } else {
                    notify('Произошла ошибка', 'ERROR')
                }
            })
        }
    }

    const deleteFromFav = () => {
        if(token && id && another_user?.id) {
            service.deleteUserFromFav({user_id: another_user?.id}, token).then(res => {
                if(res?.status === 200) {
                    updateDialogsList((s: any | any[]) => {
                        const findItem = s.find((i: any) => i.id === id)
                        if(findItem) {
                            const m = s;
                            if(filter === 'favorite') {
                                const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1)
                                return [...m]
                            } else {
                                const rm = m.splice(m.findIndex((i:any) => i.id === findItem.id), 1, {...findItem, favorite: false})
                                return [...m]
                            }
                        } else return s;
                    })
                } else {
                    notify('Произошла ошибка', 'ERROR')
                }
            })
        }
    }

 

    if(type === 'chat') {
        return (
            <div  className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                {/* <Link href={`/users/${another_user?.id}`} className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={avatar_url_thumbnail}    
                        />
                </Link> */}
                <div onClick={() => {
                    if(another_user?.id) {
                        dispatch(updateCurrentProfileId(another_user?.id))
                        dispatch(updateCurrentProfileUiid(uuid))
                        
                    }
                }} className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={user_avatar_url}    
                        />
                </div>
                <div className={styles.body}>
                    <Link
                        href={`/chat/${id}?type=${type}`} 
                        className={styles.main}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <UserTitle 
                                    username={name}
                                    age='26'
                                    textBold
                                    isOnline={online === 1}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.dialog}>
                                    {switchChatType(last_message?.chat_messageable_type)}
                                </div>
                            </Col>
                        </Row>
                    </Link>    
                    <div className={styles.ex}>
                        <div className={styles.item}>
                            {
                                favorite ? (
                                    <IconButton
                                        onClick={deleteFromFav}
                                        size={20}
                                        variant={'transparent'}
                                        icon={<AiFillStar color='var(--violet)'/>}
                                        />
                                    
                                ) : (
                                    <IconButton
                                        onClick={addToFav}
                                        size={20}
                                        variant={'transparent'}
                                        icon={<AiOutlineStar color='var(--violet)'/>}
                                        />
                                )
                            }
                        </div>
                        {/* <div className={styles.item}>
                            {
                                status === 'unread' ? (
                                    <Badge
                                         value={unreadMesssageCount}
                                        />
                                ) : (
                                    <BiCheckDouble/>
                                )
                            }
                        </div> */}
                    </div>
                </div> 
            </div>
        )
    }

    if(type === 'mail') {
        return (
            <div className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                <div onClick={() => {
                    if(another_user?.id) {
                        dispatch(updateCurrentProfileId(another_user?.id))
                        dispatch(updateCurrentProfileUiid(uuid))
                    }
                }} className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={avatar_url_thumbnail}    
                        />
                </div>
                <div className={styles.body}>
                    <Link 
                        href={`/chat/${id}?type=${type}`}
                        className={styles.main}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <UserTitle 
                                    username={name}
                                    age='26'
                                    textBold
                                    isOnline={online === 1}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.dialog}>
                                    {
                                        typeof last_message?.letter_messageable?.text === 'string' ? (
                                            <LinesEllipsis
                                                text={last_message?.letter_messageable?.text}
                                                maxLine={2}
                                        />
                                        ) : null
                                    }
                                    
                                </div>
                            </Col>
                        </Row>
                    </Link>    
                    <div className={styles.ex}>
                        {/* <div className={styles.item}>
                            {
                                isFavourite ? (
                                    <AiFillStar/>
                                ) : (
                                    <AiOutlineStar/>
                                )
                            }
                        </div> */}
                        {/* <div className={styles.item}>
                            {
                                status === 'unread' ? (
                                    <Badge
                                        value={unreadMesssageCount}
                                        />
                                ) : (
                                    <BiCheckDouble/>
                                )
                            }
                        </div> */}
                    </div>
                </div> 
            </div>
        )
    }
    return null

    
}

export default ChatItem;