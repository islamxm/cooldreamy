import styles from './Button.module.scss';
import {FC, useEffect, useRef} from 'react';
import { ButtonPropsTypes, ButtonVariants } from './types';
import {motion} from 'framer-motion';
import ripple from 'ripple-effects'
import { PulseLoader } from 'react-spinners';

const Button: FC<ButtonPropsTypes> = ({
    text,
    variant = 'default',
    disabled,
    onClick,
    style,
    before,
    after,
    hover = {boxShadow: '0.872px 9.962px 20px rgba(148, 45, 217, 0.35)'},
    fill,
    small,
    load,
    middle
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
            case 'white':
                return styles.white
            case 'gold':
                return styles.gold
        }
    }

    return (
        <motion.button 
            ref={ref}
            whileTap={{
                scale: 0.9,
                transition: {type: "spring", stiffness: 400, damping: 17}
            }} 
            transition={{type: 'spring', stiffness: 400, damping: 17}}
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            whileHover={hover}
            disabled={disabled}
            onClick={onClick}
            style={style}
            className={`${styles.button} ${switchVariant(variant)} ${fill ? styles.fill : ''} ${small ? styles.sm : ''} ${load ? styles.load : ''} ${middle ? styles.md : ''}`}>
            {
                load ? (
                    <div className={styles.load}>
                        <PulseLoader color='#fff' size={10}/>
                    </div>
                ) : null
            }
            {
                before ? (
                    <div className={styles.before}>{before}</div>
                ) : null
            }
            {
                text ? (
                    <div className={styles.text}>
                        {text}
                    </div>
                ) : null
            }
            
            {
                after ? (
                    <div className={styles.after}>{after}</div>
                ) : null
            }
        </motion.button>
    )
}

export default Button;