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
import { useRouter } from 'next/router';
import {useEffect} from 'react';


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
    active
}:chatItemPropsTypes) => {
    const {query: {type}} = useRouter()
    
    const {avatar_url, avatar_url_thumbnail, name} = another_user;

    if(type === 'chat') {
        return (
            <Link href={`/chat/${id}?type=${type}`} className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                <div className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={avatar_url_thumbnail}    
                        />
                </div>
                <div className={styles.body}>
                    <div className={styles.main}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <UserTitle 
                                    username={name}
                                    age='26'
                                    textBold
                                    isOnline={false}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.dialog}>
                                    <LinesEllipsis
                                        text={last_message?.chat_messageable?.text}
                                        maxLine={2}
                                        />
                                    
                                </div>
                            </Col>
                        </Row>
                    </div>    
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
            </Link>
        )
    }

    if(type === 'mail') {
        return (
            <Link href={`/chat/${id}?type=${type}`} className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                <div className={styles.avatar}>
                    <Avatar
                        size={63}
                        verified={is_confirmed_user == 1}
                        image={avatar_url_thumbnail}    
                        />
                </div>
                <div className={styles.body}>
                    <div className={styles.main}>
                        <Row gutter={[2,2]}>
                            <Col span={24}>
                                <UserTitle 
                                    username={name}
                                    age='26'
                                    textBold
                                    isOnline={false}/>
                            </Col>
                            <Col span={24}>
                                <div className={styles.dialog}>
                                    <LinesEllipsis
                                        text={last_message?.letter_messageable?.text}
                                        maxLine={2}
                                        />
                                    
                                </div>
                            </Col>
                        </Row>
                    </div>    
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
            </Link>
        )
    }
    return null

    
}

export default ChatItem;