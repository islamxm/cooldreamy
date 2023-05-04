import styles from './Steps.module.scss';
import Container from '@/components/Container/Container';
import {motion} from 'framer-motion';
import Button from '@/components/Button/Button';
import StepItem from './components/StepItem/StepItem';
import {Row, Col} from 'antd';
import { container, item } from '@/helpers/variantsOrderAnim';
import Router from 'next/router';
import { useWindowSize } from 'usehooks-ts';

const Steps = () => {

    const {width, height} = useWindowSize()

    return (
        <motion.div
            initial={{
                scale: 0
            }} 
            whileInView={{
                scale: 1,
                transition: {
                    type: 'spring',
                    
                },
                
            }}
            viewport={{once: true}}
            className={styles.steps}>
            <Container>
                <div className={styles.inner}>
                    <motion.div 
                        variants={container}
                        initial="hidden"
                        whileInView="visible"
                        // animate="visible" 
                        viewport={{once: true}}
                        className={styles.main}>
                        
                        <motion.div 
                            variants={{
                                hidden: { width: '0%' },
                                visible: {
                                    width: '100%',
                                    transition: {
                                        duration: 1
                                    }
                                },
                            }}
                            className={styles.line}></motion.div>
                            <div className={styles.list}>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        value={1}
                                        total={3}
                                        label={'Регистрируйся'}
                                        />
                                </div>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        value={2}
                                        total={3}
                                        label={'Смотри анкеты'}
                                        />
                                </div>
                                <div
                                    className={styles.item}
                                    >
                                    <StepItem
                                        value={3}
                                        total={3}
                                        label={'Общайся'}
                                        />
                                </div>
                            </div>
                    </motion.div>
                    <div className={styles.action}>
                        <Button
                            onClick={() => Router.push('/signup')}
                            // disabled={true}
                            text='Перейти к знакомствам'
                            // middle={width <= 768}
                            />
                    </div>
                </div>
            </Container>
        </motion.div>
    )
}


export default Steps;
