import styles from './Card.module.scss';
import Image from 'next/image';
import IFeedCard from '@/models/IFeedCard';
import {FC} from 'react';
import { cardPropsType } from './type';
import {useState, useEffect, useCallback} from 'react';
import IconButton from '@/components/IconButton/IconButton';
import {motion, useMotionValue, PanInfo, useMotionValueEvent, AnimatePresence} from 'framer-motion';
import {CgClose} from 'react-icons/cg';
import {HiHeart} from 'react-icons/hi';



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
        setLiking,
        liking,
        canceling
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
        if (info.offset.x > 300) {
          setLeaveX(1000);
          removeCard(card, "like");
        }
        if (info.offset.x < -300) {
          setLeaveX(-1000);
          removeCard(card, "nope");
        }
        setLiking(false)
        setCanceling(false)
    }


    
    const onDrag = (e: any, info: PanInfo) => {
        setRotate(Math.round(info.offset.x / 40))
        if (info.offset.x > 300) {
            setLiking(true)
        } else {
            setLiking(false)
        }
        if (info.offset.x < -300) {
            setCanceling(true)
        } else {
            setCanceling(false)
        }
    }



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
                    }}
                    exit={{
                    x: leaveX,
                    y: leaveY,
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                    }}
                    transition={{ease: [0,0,1,1], duration: .1}}
                    className={styles.wrapper}
                    >
                    <AnimatePresence>
                        {
                            canceling ? (
                                <motion.div 
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    exit={{scale: 0, opacity: 0}}
                                    transition={{
                                        type: 'spring'
                                    }}
                                    className={`${styles.status} ${styles.cancel}`}>
                                    <IconButton
                                    size={100}
                                        variant={'danger'}
                                        icon={<CgClose size={40} color='#fff'/>}
                                        />
                                </motion.div>
                            ) : null
                        }
                        {
                            liking ? (
                                <motion.div 
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    transition={{
                                        type: 'spring'
                                    }}
                                    className={`${styles.status} ${styles.like}`}>
                                    <IconButton
                                    size={100}
                                        icon={<HiHeart size={35}/>}
                                        />
                                </motion.div>
                            )  : null
                        }
                    </AnimatePresence>
                    
                    
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