import styles from './MyCard.module.scss';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';
import UserTitle from '@/components/UserTitle/UserTitle';
import Avatar from '@/components/Avatar/Avatar';
import { IUser } from '@/models/IUser';


const MyCard:FC<IUser> = ({
    name,
    state,
    credits,
    avatar_url_thumbnail,
    age
}) => {
    
    return (
        <Link href={'/profile'} className={styles.card} >
            <div className={styles.main}>
                <div className={styles.avatar}>
                    <Avatar
                        round
                        image={avatar_url_thumbnail ? avatar_url_thumbnail : placeholder}
                        />
                </div>
                <div className={styles.body}>
                    <UserTitle
                        username={name}
                        age={age ? age.toString() : ''}
                        style={{fontSize: 18}}
                        />
                    {
                        state ? (
                            <div className={styles.loc}>
                                {state}
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <div className={styles.balance}>
                Баланс: {credits} кредитов
            </div>
        </Link>
    )
}

export default MyCard;