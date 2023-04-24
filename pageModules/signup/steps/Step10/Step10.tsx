import { FC, useState, useEffect } from 'react';
import styles from './Step10.module.scss';
import {motion} from 'framer-motion';
import img from '@/public/assets/images/signup-avatar-placeholder.svg';
import Textarea from '@/components/Textarea/Textarea';
import ApiService from '@/service/apiService';
import { useAppSelector } from '@/hooks/useTypesRedux';



interface I {
    about: string,
    setAbout: (...args: any[]) => any
}

const Step10:FC<I> = ({
    about,
    setAbout
}) => {
    


    return (
        <motion.div 
            initial={{
                y: '20px',
                scale: 0.8,
                opacity: 0
            }}
            animate={{
                y: 0,
                scale: 1,
                opacity: 1
            }}
            transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>

            <div className={styles.head}>
                <h2 className={styles.title}>Расскажите о себе</h2>
                <div className={styles.subtitle}>Пара фраз о себе привлечет внимание пользователей</div>
            </div>
            <div className={styles.body}>
                <div className={styles.field}>
                    <Textarea
                        height={100}
                        value={about}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
                        placeholder='Не менее 20 символов...'
                        />
                </div>
                <div className={styles.ex}>Согласно правилам сайта запрещено указывать контактные данные</div>
            </div>
            
        </motion.div>
    )
}

export default Step10;