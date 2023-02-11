import styles from './StepItem.module.scss';
import { FC} from 'react';
import { StepItemPropsTypes } from './types';
import {motion, Variants} from 'framer-motion';
import { item } from '@/helpers/variantsOrderAnim';

const StepItem:FC<StepItemPropsTypes>  = ({
    value,
    total,
    label
}) => {

    return (
        <motion.div
            variants={item}
            className={styles.item}>
            <div className={styles.value}>
                <span className={styles.current}>{value}</span>
                <span className={styles.total}>/{total}</span>
            </div>
            <div className={styles.label}>{label}</div>
        </motion.div>
    )
}

export default StepItem;