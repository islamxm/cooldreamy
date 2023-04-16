import styles from './GiftMainCard.module.scss';
import { giftCardPropsType } from '../GiftCard/types';
import {FC} from 'react';
import Image from 'next/image';
import placeholder from '@/public/assets/images/logo.svg';
import Button from '../Button/Button';
import {AiOutlineGift} from 'react-icons/ai'

const GiftMainCard:FC<giftCardPropsType> = ({
    onSelect,
    image,
    label,
    price,
    id,
    active
}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.head}>
                <div className={styles.label}>{label}</div>
                {
                    price ? (
                        <div className={styles.price}>{price} кредитов</div>
                    ) : null
                }
            </div>
            <div className={styles.img}>
                <Image
                    loader={p => {
                        return p?.src && typeof p?.src === 'string' ? p.src  :''
                    }}
                    src={image ? image : placeholder}
                    alt=''
                    unoptimized
                    width={120}
                    height={120}
                    />
            </div>
            <div className={styles.action}>
                {
                    active ? (
                        <Button
                            text='Добавлен'
                            after={<AiOutlineGift/>}
                            middle
                            onClick={() => {
                                onSelect && onSelect('remove', id)
                            }}
                            />
                    ) : (
                        <Button
                            onClick={() => {
                                onSelect && onSelect('add', id)
                            }} 
                            middle
                            variant={'bordered'}
                            after={<AiOutlineGift/>}
                            text='Добавить'/>
                    )
                }
               
            </div>
        </div>
    )
}


export default GiftMainCard;