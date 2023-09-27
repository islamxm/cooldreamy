import styles from './Badge.module.scss';
import {FC} from 'react';
import { badgePropsType } from './types';
import Image from 'next/image';
const Badge:FC<badgePropsType> = ({
    value,
    icon,
    style
}) => {
    return (
        <div className={styles.badge} style={style}>
            {icon ? (
                <div className={styles.img}>
                    <Image
                    width={20}
                    height={20}
                    src={icon}
                    loader={p => p?.src && typeof p?.src === 'string' ? p.src : ''}
                    alt='icon'
                    />
                </div>
                
            ) : (
                value ? (
                    value < 99 ? value : '99+'
                ) : null
            )}
        </div>
    )
}

export default Badge;