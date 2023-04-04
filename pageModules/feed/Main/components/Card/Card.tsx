import styles from './Card.module.scss';
import Image from 'next/image';
import IFeedCard from '@/models/IFeedCard';
import {FC} from 'react';
import { cardPropsType } from './type';
import {useState, useEffect, useCallback} from 'react';

import {motion} from 'framer-motion';

const Card:FC<cardPropsType> = ({
    age,
    avatar_url,
    avatar_url_thumbnail,
    id,
    birthday,
    country,
    name,
    state,
    onCancel,
    onLike,
    zindex
}) => {


    //функция для прослеживания движения карточки
    const onDragEnd = useCallback((e: any,info: any) => {
        if(info?.offset?.x <= -70) {
            //cancel
            onCancel && onCancel()

        } 
        if(info?.offset?.x >= 70) {
            //like
            onLike && onLike()
        }
    }, [onCancel, onLike])



   

    return (
        <motion.div
        // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            drag
            // whileDrag={{ scale: 1.05 }}
            dragElastic={0.2}
            
            onDragEnd={onDragEnd}
            dragSnapToOrigin 
            className={styles.wrapper}
            // style={{zIndex: zindex}}
            >
            <div className={styles.img}>
                {
                    avatar_url ? (
                        <Image 
                            loader={() => avatar_url} 
                            src={avatar_url} 
                            alt='' 
                            width={560} 
                            height={560}
                            // placeholder='blur'
                            />
                    ) : null
                }
                
            </div>
            <div className={styles.label}>
                <span className={styles.name}>
                    {name}
                </span>,
                <span className={styles.age}>
                    {` ${age}`}
                </span>
            </div>
        </motion.div>
    )
}

export default Card;