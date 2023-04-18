import { FC } from 'react';
import styles from './Step4.module.scss';
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
import { IPromptSelect } from '../../types';

const interestVals: selectCardPropsTypes[] = [
    {
        label: 'Не в чем не нуждаюсь',
        image: undefined,
        value: '1',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Ищу спонсора',
        image: undefined,
        value: '2',
        onSelect: () => {},
        isSelect: false
    },
    {
        label: 'Могу быть спонсором',
        image: undefined,
        value: '3',
        onSelect: () => {},
        isSelect: false
    },
    
]


const Step4:FC<IPromptSelect> = ({
    list,
    setSelectedList,
    selectedList
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
            <h3 className={styles.head}>
                Материальное состояние
            </h3>
            <div className={styles.list}>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                label={item.text}
                                value={item.id.toString()}
                                onSelect={() => {
                                    setSelectedList(item.id)
                                }}
                                isSelect={item?.id === Number(selectedList)}
                            />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step4;