import styles from './StepMail.module.scss';
import {motion} from 'framer-motion';
import {Row, Col} from 'antd'


interface I {
    email?: string,
    
}

const StepMail = ({

}) => {

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
            <Row gutter={[25,25]}>
                <Col span={24}>
                    <div className={styles.head}>
                        <div className={styles.title}>Подтвердите электронную почту</div>
                        <div className={styles.subtitle}>Подтверждение позволит смотреть фото пользователей и откроет больше возможностей сайта</div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.body}>
                        <div className={styles.label}>Письмо отправлено на</div>
                        <div className={styles.value}>forexample@email.com</div>
                    </div>
                </Col>
                <Col span={24}></Col>
            </Row>


        </motion.div>
    )
}


export default StepMail;