import styles from './IconButton.module.scss';
import { iconButtonPropsType, iconButtonVariants } from './types';
import {FC} from 'react';
import {motion} from 'framer-motion';

const IconButton:FC<iconButtonPropsType> = (props) => {
    const {icon, variant = 'default', size = 62, style, onClick = () => {}} = props;

    const switchVariant = (variant: iconButtonVariants) => {
        switch(variant) {
            case 'default':
                return styles.default
            case 'danger':
                return styles.danger
            case 'transparent':
                return styles.transparent
            default:
                return styles.default
        }
    }

    const switchHover = (variant: iconButtonVariants) => {
        switch(variant) {
            case 'danger':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
            case 'default':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
            case 'transparent':
                return {filter: 'drop-shadow(0px 0px 10px var(--red))'}
        }
    }

    return (
        <button
            type='button'
            onClick={onClick}
            style={{...style, width: size, height: size}}
            className={`${styles.wrapper} ${switchVariant(variant)}`}
            >
            {icon}
        </button>
    )
}

export default IconButton