import { FC } from 'react';
import styles from './Step3.module.scss';
import {motion} from 'framer-motion';
import { interestTypes } from '../../types';
import { selectCardPropsTypes } from '@/components/SelectCard/types';

import img1 from '@/public/assets/icons/interest-1.svg';
import img2 from '@/public/assets/icons/interest-2.svg';
import img3 from '@/public/assets/icons/interest-3.svg';
import img4 from '@/public/assets/icons/interest-4.svg';
import img5 from '@/public/assets/icons/interest-5.svg';
import img6 from '@/public/assets/icons/interest-6.svg';
import SelectCard from '@/components/SelectCard/SelectCard';


const interestVals: selectCardPropsTypes[] = [
    {
        label: 'Музыка',
        image: img1,
        value: '1',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Спорт',
        image: img2,
        value: '2',
        onSelect: () => {},
        isSelect: false
    },
    // {
    //     label: 'Кино',
    //     image: img3,
    //     value: '3',
    //     onSelect: () => {},
    //     isSelect: false
    // },
    {
        label: 'Путешествия',
        image: img4,
        value: '4',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Кулинария',
        image: img5,
        value: '5',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Машины',
        image: img6,
        value: '6',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Искусство',
        image: null,
        value: '7',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'IT',
        image: null,
        value: '8',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Финансы и инвестиции',
        image: null,
        value: '9',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Наука',
        image: null,
        value: '9',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Бары и рестораны',
        image: null,
        value: '10',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Экстрим',
        image: null,
        value: '11',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Природа',
        image: null,
        value: '12',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Литература',
        image: null,
        value: '12',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Шоппинг',
        image: null,
        value: '12',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Танцы',
        image: null,
        value: '12',
        onSelect: () => {},
        isSelect: false
    }
    
]


const Step3:FC = () => {
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
            
            <h3 className={styles.head}>
                Расскажите о своих интересах
            </h3>
            <div className={styles.list}>
                {
                    interestVals?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                {...item}
                                isSelect={index === 0}
                                />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step3;