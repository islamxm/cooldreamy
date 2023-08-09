import styles from './Step2.module.scss';
import SelectCard from '@/components/SelectCard/SelectCard';
import { FC, useState, useEffect } from 'react';
import { selectCardPropsTypes } from '@/components/SelectCard/types';
import {motion} from 'framer-motion';
import { IPromptSelect } from '../../types';
import { useAppSelector } from '@/hooks/useTypesRedux';

const Step2:FC<IPromptSelect> = ({
    list,
    selectedList,
    setSelectedList
}) => {
    const {locale} = useAppSelector(s => s)
    const [error, setError] = useState(false)

    useEffect(() => {
        if(selectedList && selectedList?.length >= 3) {
            setError(true)
        } else {
            setError(false)
        }
    }, [selectedList])


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
            <h3 className={styles.head}>{locale.signupPage.steps.step_2.title}</h3>
            <div className={`${styles.count} ${error ? styles.error : ''}`}>Selected: {selectedList ? selectedList?.length : 0}/3</div>
            <div className={styles.list}>
                {
                    list?.map((item, index) => (
                        <div className={styles.item} key={index}>
                            <SelectCard
                                image={item?.icon}
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
                                        if(selectedList && selectedList?.length < 3)
                                        setSelectedList((s: any[]) => [...s, Number(item.id)])
                                    }
                                }}
                                isSelect={selectedList?.find(i => Number(i) === Number(item.id)) ? true : false}
                            />
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}

export default Step2;