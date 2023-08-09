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
import { useAppSelector } from '@/hooks/useTypesRedux';



const Step4:FC<IPromptSelect> = ({
    list,
    setSelectedList,
    selectedList
}) => {
    const {locale} = useAppSelector(s => s)

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
                {locale?.signupPage.steps.step_4.title}
            </h3>
            <div className={styles.list}>
                {
                    list?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                // disabled={selectedList && Number(selectedList[0]) !== item.id}
                                image={item?.icon}
                                label={item.text}
                                value={item.id.toString()}
                                onSelect={() => {
                                    setSelectedList([item.id])
                                }}
                                isSelect={selectedList && Number(selectedList[0]) === item.id ? true : false}
                            />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step4;