import styles from './Hero.module.scss';
import { FC, useEffect } from 'react';
import Container from '@/components/Container/Container';
import SelectSex from '@/components/SelectSex/SelectSex';
import { useState } from 'react';
import {Row, Col} from 'antd';
import {container, item} from '../../../../helpers/variantsOrderAnim';
import Image from 'next/image';
import phone1 from '@/public/assets/images/phone-1.svg';
import phone2 from '@/public/assets/images/phone-2.svg';
import { motion, useScroll, useTransform } from "framer-motion";


const Hero: FC = ({}) => {
    const [sex, setSex] = useState<'male' | 'female'>('male')
    const {scrollYProgress} = useScroll()
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);


    const sexChange = (value: 'male' | 'female') => {
        setSex(value)
    }


    return (
        <div className={styles.hero}>
            <Container>
                <motion.div
                    initial="hidden"
                    animate="visible" 
                    variants={container} 
                    className={styles.inner}>
                    <div className={styles.main} >
                        <motion.h1 variants={item} className={styles.title}>
                        Более 16 000 пользователей 
                        <br></br>
                        <span>нашли идеальную пару</span>  
                        </motion.h1>
                        <motion.div variants={item} className={styles.subtitle}>
                            Всего за 3 простых шага 
                        </motion.div>
                        <div className={styles.selects}>
                            <motion.div variants={item}>
                                <SelectSex
                                    value={sex}
                                    onSelect={sexChange}
                                    />
                            </motion.div>
                        </div>
                        
                    </div>
                    <div className={styles.motion}>
                            <div className={styles.clouds}>

                            </div>
                            <motion.div 
                                className={styles.phones}
                                style={{scale}}
                                >
                                <motion.div  
                                    variants={item} 
                                    className={styles.item}>
                                    <motion.div
                                        animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2.4,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        }}
                                        >
                                        <Image
                                            src={phone1}
                                            alt={'phone 1'}
                                            />
                                    </motion.div>
                                </motion.div>
                                <motion.div 
                                    variants={item}
                                    className={styles.item}>
                                    <motion.div
                                        animate={{
                                            y: ['0px', '-20px', '0px']
                                        }}
                                        transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        times: [0, 0.5, 1],
                                        repeat: Infinity,
                                        repeatDelay: 0
                                        }}
                                        >
                                        <Image
                                            src={phone2}
                                            alt={'phone 2'}
                                            />
                                    </motion.div>
                                    
                                </motion.div>
                            </motion.div>
                        </div>
                </motion.div>
            </Container>
        </div>
    )
}

export default Hero;