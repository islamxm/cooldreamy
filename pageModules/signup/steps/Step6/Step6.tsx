import { FC } from 'react';
import styles from './Step6.module.scss';
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
        label: ' Нет детей',
        image: undefined,
        value: '1',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Не хочу детей',
        image: undefined,
        value: '2',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Хочу ребенка',
        image: undefined,
        value: '3',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Есть дети',
        image: undefined,
        value: '4',
        onSelect: () => {},
        isSelect: false
    },
]


const Step6:FC = () => {
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
                Дети 
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

export default Step6;