import styles from './Last.module.scss';
import { FC } from 'react';
import mainImg from '@/public/assets/images/last-img.png';
import {Row, Col} from 'antd';
import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import {motion} from 'framer-motion';
import { container, item } from '@/helpers/variantsOrderAnim';


const Last:FC = () => {
    return (
        <div className={styles.wrapper}>
            <Container>
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                    className={styles.inner}>
                    <div className={styles.content}>
                        <Col span={24}>
                            <Row gutter={[25, 25]}>
                                <Col span={24}>
                                    <motion.h2 variants={item} className="block-title">Начни общение</motion.h2>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.text}>
                                        <p>
                                        В наше время приложения для знакомств стали неотъемлемой частью нашей жизни. Они позволяют вам проверить профиль одиночек, живущих рядом с вами, пообщаться с ними, познакомиться с ними и, возможно, влюбиться.
                                        </p>
                                    </motion.div>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item}>
                                        <Button
                                            text='Заполнить анкету'
                                            />
                                    </motion.div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <div className={styles.motion}>
                        <motion.div variants={item} className={styles.img}>
                            <Image
                                src={mainImg}
                                alt="img"
                                />
                        </motion.div>
                        <motion.div variants={item} className={styles.pn}>
                            Присоединяйся, чтобы построить счастливые отношения  
                        </motion.div>
                        <motion.div variants={item} className={styles.pl}>
                            Найти половинку стало просто!
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
            
        </div>
    )
}

export default Last;