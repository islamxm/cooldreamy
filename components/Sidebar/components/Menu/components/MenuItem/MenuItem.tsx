import styles from './MenuItem.module.scss';
import { menuItemType } from '../../types';
import {FC} from 'react';
import Link from 'next/link';


const MenuItem:FC<menuItemType> = ({
    label,
    link,
    icon,
    onClick,
    isActive,
    badge
}) => {


    if(link) {
        return (
            <Link href={link} className={`${styles.item} ${isActive ? styles.active : ''}`}>
                {
                    badge && (
                        <div className={styles.badge}>{badge < 100 ? badge : `${99}+`}</div>
                    )
                }
                <div className={styles.icon}>
                    {icon}
                </div>
                <div className={styles.label}>{label}</div>
            </Link>
        )
    } else {
        return (
            <div 
                onClick={onClick}
                className={styles.item}>
                {
                    badge && (
                        <div className={styles.badge}>{badge < 100 ? badge : `${99}+`}</div>
                    ) 
                }
                <div className={styles.icon}>
                    {icon}
                </div>
                <div className={styles.label}>{label}</div>
            </div>
        )
    }
    
}

export default MenuItem;