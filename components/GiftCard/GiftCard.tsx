import styles from './GiftCard.module.scss';
import Badge from '../Badge/Badge';
import Image from 'next/image';
import {FC} from 'react';
import { giftCardPropsType } from './types';


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
                    src={image}
                    alt={""}
                    />
            </div>
        </div>
    )
}

export default GiftCard;