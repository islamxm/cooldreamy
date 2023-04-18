import styles from './Step2.module.scss';
import SelectCard from '@/components/SelectCard/SelectCard';
import { FC } from 'react';
import img1 from '@/public/assets/images/target-1.png'
import img2 from '@/public/assets/images/target-2.png'
import img3 from '@/public/assets/images/target-3.png'
import img4 from '@/public/assets/images/target-4.png'
import { selectCardPropsTypes } from '@/components/SelectCard/types';
import {motion} from 'framer-motion';
import { IPromptSelect } from '../../types';

const targetVals: selectCardPropsTypes[] = [
    {
        image: img1,
        label: 'Найти идеальную пару',
        onSelect: () => {},
        isSelect: false,
        value: '1'
    },
    {
        image: img2,
        label: 'Вместе путешествовать',
        onSelect: () => {},
        isSelect: false,
        value: '2'
    },
    {
        image: img3,
        label: 'Серьезные отношения',
        onSelect: () => {},
        isSelect: false,
        value: '3'
    },
    {
        image: img4,
        label: 'Хочу на свидание',
        onSelect: () => {},
        isSelect: false,
        value: '4'
    }
];

const Step2:FC<IPromptSelect> = ({
    list,
    selectedList,
    setSelectedList
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
            <h3 className={styles.head}>Расскажите о своих целях на сайте</h3>
            <div className={styles.list}>
                {/* {
                    targetVals?.map((item,index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                {...item}
                                />
                        </div>
                    ))
                } */}
                {
                    list?.map((item, index) => (
                        <div className={styles.item} key={index}>
                            {/* <SelectCard
                                label={item.text}
                                value={item.id.toString()}
                                onSelect={() => {
                                    if(selectedList?.find(i => Number(i) === Number(item.id))) {
                                        setSelectedList((s:any[]) => {
                                            const r = s;
                                            const rm = s.splice(r.findIndex(r => Number(r) === Number(item.id)), 1)
                                            return [...r]
                                        })
                                    } else {
                                        setSelectedList((s: any[]) => [...s, Number(item.id)])
                                    }
                                }}
                                isSelect={selectedList?.find(i => Number(i) === Number(item.id)) ? true : false}
                                /> */}
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

export default Step2;