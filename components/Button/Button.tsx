import styles from './Button.module.scss';
import {FC, useEffect, useRef} from 'react';
import { ButtonPropsTypes, ButtonVariants } from './types';
import {motion} from 'framer-motion';
import ripple from 'ripple-effects'


const Button: FC<ButtonPropsTypes> = ({
    text,
    variant = 'default',
    disabled,
    onClick,
    style,
    before,
    after,
    hover = {boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)'}
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
            case 'simple':
                return styles.simple
            case 'bordered':
                return styles.bordered
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
            whileHover={hover}
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={`${styles.button} ${switchVariant(variant)}`}>
            {
                before ? (
                    <div className={styles.before}>{before}</div>
                ) : null
            }
            {text}
            {
                after ? (
                    <div className={styles.after}>{after}</div>
                ) : null
            }
        </motion.button>
    )
}

export default Button;