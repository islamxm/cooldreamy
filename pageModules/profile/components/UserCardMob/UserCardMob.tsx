import styles from './UserCardMob.module.scss';
import Image from 'next/image';
import { IUser } from '@/models/IUser';
import {FC} from 'react';
import Avatar from 'antd/es/avatar/avatar';



const UserCardMob:FC<IUser> = ({
    avatar_url_thumbnail
}) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.avatar}>
                    <Image
                        width={120}
                        height={120}
                        src={avatar_url_thumbnail ? avatar_url_thumbnail : ''}
                        loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                        alt=''
                        />  
                </div>
                <div className={styles.body}>

                </div>
            </div>
            <div className={styles.action}>
                <div className={styles.item}>
                    <button className={styles.btn}>
                        Баланс: 5 кредитов
                    </button>
                </div>
                <div className={styles.item}>
                    <button className={styles.btn}>
                        Премиум статус
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCardMob;