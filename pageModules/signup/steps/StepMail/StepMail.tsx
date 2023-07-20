import styles from './StepMail.module.scss';
import {motion} from 'framer-motion';
import {Row, Col} from 'antd'


const StepMail = () => {

    return (
        <motion.div 
        initial={{
            y: '20px',
            scale: 0.8,
            opacity: 0
        }}
        animate={{
            y: 0,
            scale: 1,
            opacity: 1
        }}
        transition={{type: 'spring', stiffness: 400, damping: 17 }}
            className={styles.wrapper}>
                


        </motion.div>
    )
}


export default StepMail;