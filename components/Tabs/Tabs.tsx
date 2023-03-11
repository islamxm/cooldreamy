import styles from './Tabs.module.scss';
import { tabsPropsType } from './types';
import {FC} from 'react';
import {motion} from 'framer-motion';
import Badge from '../Badge/Badge';


const Tabs:FC<tabsPropsType> = ({
    onChange,
    activeItem,
    list
}) => {
    return (
        <div className={styles.wrapper}>
            {
                list?.map((item, index) => (
                    <motion.button 
                        onClick={() => onChange(item.id)}
                        whileTap={{scale: 0.9}}
                        transition={{type: 'spring', stiffness: 400, damping: 17}}
                        className={`${styles.item} ${activeItem && activeItem === item.id ? styles.active : ''}`}
                        key={index}
                        >   
                        <div className={styles.label}>{item.label}</div>
                        {
                            item?.badge ? (
                                <Badge value={item.badge}/>
                            ) : null
                        }
                    </motion.button>
                ))
            }
        </div>
    )
}

export default Tabs;