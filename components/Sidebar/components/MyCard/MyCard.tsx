import styles from './MyCard.module.scss';
import placeholder from '@/public/assets/images/avatar-placeholder.png';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';
import UserTitle from '@/components/UserTitle/UserTitle';
import Avatar from '@/components/Avatar/Avatar';
import { IUser } from '@/models/IUser';
import UserLocation from '@/components/UserLocation/UserLocation';
import { useAppSelector } from '@/hooks/useTypesRedux';
import {AiFillDollarCircle} from 'react-icons/ai';
import {useEffect} from 'react';

const MyCard:FC<IUser> = ({
    name,
    state,
    country,
    credits,
    avatar_url_thumbnail,
    age,
    online
}) => {
    const {userData, locale} = useAppSelector(s => s)

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
                        username={name ? name : ''}
                        age={age ? age.toString() : ''}
                        style={{fontSize: 18}}
                        isOnline={online === 1}
                        />
                    <UserLocation
                        state={state}
                        country={country}
                        size={14}
                        />
                </div>
            </div>
            <div className={styles.balance}>
                <Link href={'/deposit'}>
                {locale?.global.my_card.balance.title}: {credits ? credits : 0} <span><AiFillDollarCircle/></span>
                </Link>
                
            </div>
        </Link>
    )
}

export default MyCard;