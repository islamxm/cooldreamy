import styles from './UserCard.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';
import {FC} from 'react';
import { userCardPropsTypes } from './types';
import {BsCheck2} from 'react-icons/bs';
import Link from 'next/link';
import placeholder from '@/public/assets/images/avatar-placeholder.png'
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';
import { useRouter } from 'next/router';
import { IUser } from '@/models/IUser';


const service = new ApiService()

interface IUserCard extends IUser {
    children?: React.ReactNode,

}


const UserCard:FC<IUserCard> = ({
    children,
    avatar_url_big_thumbnail
}) => {
    const {token} = useAppSelector(s => s)


    




    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.main}>
                        {/* {
                            verify ? (
                                <div className={styles.verif}>
                                    Фото проверено
                                    <BsCheck2/>
                                </div>
                            ) : null
                        } */}
                        <div className={styles.img}>
                            <Image 
                                loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                                src={avatar_url_big_thumbnail ? avatar_url_big_thumbnail : placeholder}
                                width={275}
                                height={285}
                                unoptimized
                                alt=""/>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    {children}
                </Col>
            </Row>
        </div>
    )
}

export default UserCard;