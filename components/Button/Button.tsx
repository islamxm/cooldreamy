import styles from './Button.module.scss';
import {FC, useEffect, useRef} from 'react';
import { ButtonPropsTypes, ButtonVariants } from './types';
import {motion} from 'framer-motion';
import ripple from 'ripple-effects'


const Button: FC<ButtonPropsTypes> = ({
    text,
    variant = 'default',
    disabled,
    onClick
}) => {
    const ref = useRef(null);

    // useEffect(() => {
    //     ripple(ref?.current, {
    //         background: 'var(--purp)',
    //         duration: 1000,
    //         opacity: 0.2
    //     })
    // }, [])

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
            ref={ref}
            whileTap={{
                scale: 0.9,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }} 
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