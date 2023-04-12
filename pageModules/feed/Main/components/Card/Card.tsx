import styles from './Card.module.scss';
import Image from 'next/image';
import IFeedCard from '@/models/IFeedCard';
import {FC} from 'react';
import { cardPropsType } from './type';
import {useState, useEffect, useCallback} from 'react';

import {motion, useMotionValue, PanInfo, useMotionValueEvent} from 'framer-motion';




const Card:FC<cardPropsType> = ({
    

    card,
    // !! test
    active,
    removeCard
}) => {
    const {age,
        avatar_url,
        avatar_url_thumbnail,
        id,
        birthday,
        country,
        name,
        state,
        onCancel,
        onLike,
        zindex,
        setCanceling,
        setLiking
    } = card

    const [rotate, setRotate] = useState(1)
    const [leaveX, setLeaveX] = useState(0);
    const [leaveY, setLeaveY] = useState(0);

    const onDragEnd = (_e: any, info: PanInfo) => {
        // if (info.offset.y < -100) {
        //   setLeaveY(-2000);
        //   removeCard(card, "superlike");
        //   return;
        // }
        if (info.offset.x > 100) {
          setLeaveX(1000);
          removeCard(card, "like");
        }
        if (info.offset.x < -100) {
          setLeaveX(-1000);
          removeCard(card, "nope");
        }
        setLiking(false)
        setCanceling(false)
    }


    
    const onDrag = (e: any, info: PanInfo) => {
        setRotate(info.offset.x / 40)
        if (info.offset.x > 100) {
            setLiking(true)
        } else {
            setLiking(false)
        }
        if (info.offset.x < -100) {
            setCanceling(true)
        } else {
            setCanceling(false)
        }
    }


    //функция для прослеживания движения карточки
    // const onDragEnd = useCallback((e: any,info: any) => {
        
    //     if(info?.offset?.x <= -70) {
    //         //cancel
    //         onCancel && onCancel()
    //         setDone(false)
    //     } 
    //     if(info?.offset?.x >= 70) {
    //         //like
    //         onLike && onLike()
    //         setDone(false)
    //     }
        
    // }, [onCancel, onLike])





   

    // return (
    //     <motion.div
    //     // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    //         drag
    //         // onDrag={(e,i) => setRotate(i.offset.x / 50)}
    //         style={{x}}
    //         // whileDrag={{ rotate: rotate === 0 ? 1 : rotate }}
    //         dragElastic={0.2}
    //         // onDragEnd={onDragEnd}
    //         dragSnapToOrigin={done} 
    //         className={styles.wrapper}
    //         exit={{opacity: 0}}
    //         >
    //         <div className={styles.img}>
    //             {
    //                 avatar_url_thumbnail ? (
    //                     <Image 
    //                         // loader={() => avatar_url_thumbnail} 
    //                         src={avatar_url_thumbnail} 
    //                         alt='' 
    //                         width={560} 
    //                         height={560}
    //                         // placeholder='blur'
    //                         />
    //                 ) : null
    //             }
                
    //         </div>
    //         <div className={styles.label}>
    //             <span className={styles.name}>
    //                 {name}
    //             </span>,
    //             <span className={styles.age}>
    //                 {` ${age}`}
    //             </span>
    //         </div>
    //     </motion.div>
    // )
    return (
        <>
        {
            active ? (
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    onDragEnd={onDragEnd}
                    onDrag={onDrag}
                    whileDrag={{ rotate: rotate === 0 ? 1 : rotate }}
                    initial={{
                    scale: 1,
                    }}
                    animate={{
                    scale: 1.05,
                    // rotate: `${card?.name && card?.name?.length % 2 === 0 ? 6 : -6}deg`,
                    }}
                    exit={{
                    x: leaveX,
                    y: leaveY,
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                    }}
                    className={styles.wrapper}
                    >
                    <div className={styles.img}>
                        {
                            avatar_url_thumbnail ? (
                                <Image 
                                    // loader={() => avatar_url_thumbnail} 
                                    src={avatar_url_thumbnail} 
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
            )   : (
                <div
                className={styles.wrapper}
                >
                <div className={styles.img}>
                    {
                        avatar_url_thumbnail ? (
                            <Image 
                                // loader={() => avatar_url_thumbnail} 
                                src={avatar_url_thumbnail} 
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
            </div>
            )
        }
        </>
    )
}

export default Card;