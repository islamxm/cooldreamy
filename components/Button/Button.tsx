import styles from './Button.module.scss';
import {FC} from 'react';
import { ButtonPropsTypes, ButtonVariants } from './types';
import {motion} from 'framer-motion';

const Button: FC<ButtonPropsTypes> = ({
    text,
    variant = 'default',
    disabled,
    onClick
}) => {

    const switchVariant = (variant: ButtonVariants) => {
        switch(variant) {
            case 'default':
                return styles.default
            case 'danger':
                return styles.danger
        }
    }

    return (
        <motion.button 
            whileTap={{
                scale: 0.95,
                transition: {
                    duration: 0.2
                }
            }}
            whileHover={{
                boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)',
            }}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${switchVariant(variant)}`}>
            {text}
        </motion.button>
    )
}

export default Button;