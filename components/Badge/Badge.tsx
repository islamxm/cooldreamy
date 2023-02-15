import styles from './Badge.module.scss';
import {FC} from 'react';
import { badgePropsType } from './types';

const Badge:FC<badgePropsType> = ({
    value,
    style,
    icon
}) => {
    return (
        <div className={styles.badge}>
            {icon ? icon : (
                value ? (
                    value < 99 ? value : '99+'
                ) : null
            )}
        </div>
    )
}

export default Badge;