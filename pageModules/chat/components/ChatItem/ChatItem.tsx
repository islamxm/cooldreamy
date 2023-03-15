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


const ChatItem = ({
    isActive,
    isFavourite,
    status,
    unreadMesssageCount,
    id
}:chatItemPropsTypes) => {

    return (
        <Link href={`/chat/${id}`} className={`${styles.wrapper} ${isActive ? styles.active : ''}`}>
            <div className={styles.avatar}>
                <Image
                    src={avatarImg}
                    width={63}
                    height={63}
                    alt="avatar"
                    />
            </div> 
            <div className={styles.body}>
                <div className={styles.main}>
                    <Row gutter={[2,2]}>
                        <Col span={24}>
                            <UserTitle 
                                username='Виктория'
                                age='26'
                                textBold
                                isOnline/>
                        </Col>
                        <Col span={24}>
                            <div className={styles.dialog}>
                                <LinesEllipsis
                                    text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem illo odit modi magni architecto corrupti officia necessitatibus porro, harum animi laudantium, quaerat minima ab accusamus, libero expedita minus! Officia, nulla!"
                                    maxLine={2}
                                    />
                                
                            </div>
                        </Col>
                    </Row>
                </div>    
                <div className={styles.ex}>
                    <div className={styles.item}>
                        {
                            isFavourite ? (
                                <AiFillStar/>
                            ) : (
                                <AiOutlineStar/>
                            )
                        }
                    </div>
                    <div className={styles.item}>
                        {
                            status === 'unread' ? (
                                <Badge
                                    value={unreadMesssageCount}
                                    />
                            ) : (
                                <BiCheckDouble/>
                            )
                        }
                    </div>
                </div>
            </div> 
        </Link>
    )
}

export default ChatItem;