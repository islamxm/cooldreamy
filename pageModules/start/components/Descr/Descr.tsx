import styles from './Descr.module.scss';
import { FC } from 'react';
import Container from '@/components/Container/Container';
import img from '@/public/assets/images/descr-img.png';
import Image from 'next/image';
import {Row, Col} from 'antd';
import {motion} from 'framer-motion';
import { container, item } from '@/helpers/variantsOrderAnim';


const Descr:FC = () => {
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
                                    <motion.h2 variants={item} className="block-title">Что такое Dating service?</motion.h2>
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.text}>
                                        <p>
                                        Это один из самых популярных и развитых сервисов для современных знакомств женщин и мужчин, которые ищут любовь в Интернете.
                                        </p>
                                        <br>
                                        </br>
                                        <p>
                                        Этот сайт может помочь Вам быстро и эффективно найти свою половинку благодаря современным технологиям и многолетнему опыту работы в сфере знакомств!
                                        </p>
                                    </motion.div>
                                    
                                </Col>
                                <Col span={24}>
                                    <motion.div variants={item} className={styles.ex}>
                                    Знакомься с новыми людьми уже сегодня!
                                    </motion.div>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                    <motion.div variants={item} className={styles.img}>
                        <div className={styles.el}>
                            <Image 
                                placeholder={'blur'}
                                src={img} 
                                alt="dating"/>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Descr;