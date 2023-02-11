import styles from './Adv.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import AdvItem from './components/AdvItem/AdvItem';
import {motion} from 'framer-motion';
import adv1 from '@/public/assets/images/adv-1.svg';
import adv2 from '@/public/assets/images/adv-2.svg';
import adv3 from '@/public/assets/images/adv-3.svg';
import { container, item } from '@/helpers/variantsOrderAnim';


const Adv:FC = () => {
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
            className={styles.wrapper}>
            <Container>
                <motion.div 
                    initial="hidden"
                    whileInView={'visible'}
                    variants={container}
                    viewport={{once: true}}
                    className={styles.inner}>
                    <div className={styles.list}>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv1}
                                label={'Умный фильтр'}
                                text={'Специальный алгоритм позволит быстро найти подходящую пару'}
                                />
                        </motion.div>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv2}
                                label={'Безопасность'}
                                text={'Вы можете быть уверенны за приватность данных на сервисе'}
                                />
                        </motion.div>
                        <motion.div variants={item} className={styles.item}>
                            <AdvItem
                                img={adv2}
                                label={'Проверка'}
                                text={'Пользователи существуют и заинтересованы в отношениях'}
                                />
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </motion.div >
    )
}

export default Adv;