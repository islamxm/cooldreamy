import styles from './SelectCard.module.scss';
import { FC } from 'react';
import {motion} from 'framer-motion';
import Image from 'next/image';
import { selectCardPropsTypes } from './types';
import {Row, Col} from 'antd';
import Ripple from '../Ripple/Ripple';

const SelectCard:FC<selectCardPropsTypes> = ({
    image,
    label,
    isSelect,
    onSelect,
    value
}) => {
    return (
        <motion.div 
            onClick={() => onSelect(value)}
            whileTap={{
                scale: 0.9,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}  
            className={`${styles.card} ${isSelect ? styles.active : ''}`}>
            
            {
                isSelect && <motion.div className={styles.ind}></motion.div>
            }
            

            <Col span={24}>
                <Row gutter={[5,5]}>
                    <Col span={24}>
                        <div className={styles.img}>
                            {
                                image ? (
                                    <Image width={90} height={90} src={image} alt={label}/>
                                ) : null
                            }
                            
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className={styles.label}>
                            {label}
                        </div>
                    </Col>
                </Row>
            </Col>
            <Ripple
                    color='var(--light_purp_2)'
                    />
        </motion.div>
    )
}

export default SelectCard;