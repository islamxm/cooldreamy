import styles from './GiftCard.module.scss';
import Badge from '../Badge/Badge';
import Image from 'next/image';
import {FC} from 'react';
import { giftCardPropsType } from './types';
import placeholder from '@/public/assets/images/logo.svg';

const GiftCard:FC<giftCardPropsType> = ({
    image,
    badgeValue,

}) => {
    
    return (
        <div className={styles.card}>
            {
                badgeValue ? (
                    <div className={styles.badge}>
                        <Badge
                            value={badgeValue}
                            />
                    </div>
                ) : null
            }
            <div className={styles.img}>
                <Image
                    loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                    unoptimized
                    src={image ? image : placeholder}
                    alt={""}
                    />
            </div>
        </div>
    )
}

export default GiftCard;