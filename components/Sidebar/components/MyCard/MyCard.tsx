import styles from './MyCard.module.scss';
import avatar from '@/public/assets/images/my-avatar.png';
import Image from 'next/image';
import {FC} from 'react';
import Link from 'next/link';

const MyCard:FC = () => {
    
    return (
        <Link href={'/profile'} className={styles.card} >
            <div className={styles.main}>
                <div className={styles.avatar}>
                    <Image src={avatar} alt="avatar"/>
                </div>
                <div className={styles.body}>
                    <div className={styles.name}>
                        Александр, 26
                    </div>
                    <div className={styles.loc}>
                    Киев,Украина
                    </div>
                </div>
            </div>
            <div className={styles.balance}>
                Баланс: 5 кредитов
            </div>
        </Link>
    )
}

export default MyCard;